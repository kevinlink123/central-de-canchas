import { getAuth } from "firebase/auth";
import { addDoc, collection, updateDoc, doc, getDocs, query, limit, orderBy, startAfter, QueryDocumentSnapshot, DocumentData, arrayUnion, where, deleteDoc } from "firebase/firestore";
import { MarkerDataInterface } from "../types/Map.interface";
import { app, db } from "./clientApp";

class MarkerService {
    auth;

    constructor() {
        this.auth = getAuth(app);
    }

    async registerNewMarker(newMarkerData: MarkerDataInterface) {
        try {
            const docRef = await addDoc(collection(db, 'courts'), newMarkerData);

            const { uid } = newMarkerData;
            const userRef = doc(db, 'users', uid);
            await updateDoc(userRef, {
                registeredCourts: arrayUnion(docRef.id)
            });

        } catch (e: any) {
            console.log(e.code);
        }
    }

    async deleteCourt(courtName: string) {
        try {
            const q = query(collection(db, 'courts'), where('courtName', '==', courtName))
            const querySnap = await getDocs(q);
            const courtRef = querySnap.docs[0].ref;

            await deleteDoc(courtRef);
        } catch(e: any) {
            console.log(e.code);
        }
    }

    async getPaginatedCourtsData(lastCourtCalled: QueryDocumentSnapshot<DocumentData> | null) {
        const q = query(collection(db, 'courts'), orderBy('courtName'), startAfter(lastCourtCalled ? lastCourtCalled : ''), limit(6));
        
        const querySnapshot = await getDocs(q);
        const lastCourt = querySnapshot.docs.length > 5 ? querySnapshot.docs[querySnapshot.docs.length-1] : null;
        
        const courtsData = querySnapshot.docs.map((doc) => {
            const { courtName, address, municipality, province, surfaceType, numberOfHoops, numberOfCourts, rimHeight, rimCondition } = doc.data();

                const singleCourtData = {
                    courtName,
                    address,
                    municipality,
                    province,
                    surfaceType,
                    numberOfHoops,
                    numberOfCourts,
                    rimHeight,
                    rimCondition
                }
                return singleCourtData;
        });
        return {
            courtsData: courtsData,
            lastCourtCalled: lastCourt
        };
    }

    //CHANGE NAME TO "getAllCourts"
    async getAllMarkers() {
        try {
            const querySnapshot = await getDocs(collection(db, 'courts'));
            const markers: MarkerDataInterface[] = [];
            querySnapshot.forEach((doc) => {
                const { uid, coordinates, courtName, address, municipality, province, surfaceType, numberOfHoops, numberOfCourts, rimHeight, rimCondition} = doc.data();

                const singleMarker = {
                    uid: uid,
                    coordinates: coordinates,
                    courtName: courtName,
                    address: address,
                    municipality: municipality,
                    province: province,
                    surfaceType: surfaceType,
                    numberOfHoops: numberOfHoops,
                    numberOfCourts: numberOfCourts,
                    rimHeight: rimHeight,
                    rimCondition: rimCondition
                }
                markers.push(singleMarker);
            });

            return markers;
        } catch (e: any) {
            console.log(e.code);
            return [];
        }
    }
}

export default new MarkerService();