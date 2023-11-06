import { getAuth } from "firebase/auth";
import { addDoc, collection, getDoc, doc, getDocs, query, limit, orderBy, startAfter, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { MarkerDataInterface } from "../types/Map.interface";
import { app, db } from "./clientApp";
import { CourtsTableData } from "../types/CourtsData.interface";

class MarkerService {
    auth;

    constructor() {
        this.auth = getAuth(app);
    }

    //Add id field to court data
    async registerNewMarker(newMarkerData: MarkerDataInterface) {
        try {
            const docRef = await addDoc(collection(db, 'courts'), newMarkerData);
            console.log('Marcador agregado con éxito')
            console.log('ID: ', docRef.id)

        } catch (e: any) {
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
                const { coordinates, courtName, address, municipality, province, surfaceType, numberOfHoops, numberOfCourts, rimHeight, rimCondition} = doc.data();

                const singleMarker = {
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