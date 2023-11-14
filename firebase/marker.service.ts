import { getAuth } from "firebase/auth";
import { addDoc, collection, updateDoc, doc, getDocs, query, limit, orderBy, startAfter, QueryDocumentSnapshot, DocumentData, arrayUnion, where, deleteDoc, getDoc, arrayRemove, documentId, setDoc, increment } from "firebase/firestore";
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
            await updateDoc(docRef, {
                id: docRef.id
            });

        } catch (e: any) {
            console.log(e.code);
        }
    }

    async deleteCourt(courtName: string) {
        try {
            const q = query(collection(db, 'courts'), where('courtName', '==', courtName));
            const querySnap = await getDocs(q);
            const courtRef = querySnap.docs[0].ref;
            const { uid } = querySnap.docs[0].data();

            await deleteDoc(courtRef);

            const userDocRef = doc(db, 'users', uid);
            await updateDoc(userDocRef, {
                registeredCourts: arrayRemove(courtRef.id)
            });
            return {
                error: ''
            }
        } catch(e: any) {
            console.log(e);
            return {
                error: 'Solo los usuarios admin pueden eliminar canchas'
            }
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
                const { uid, visits, coordinates, courtName, address, municipality, province, surfaceType, numberOfHoops, numberOfCourts, rimHeight, rimCondition} = doc.data();

                const singleMarker = {
                    id: doc.id,
                    uid: uid,
                    visits: visits,
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
    
    //Get single court for single court page - Add one unit to the visits quantity
    async getCourt(id: any) {
        try {
            const courtRef = doc(db, 'courts', id);
            await updateDoc(courtRef, {
                visits: increment(1)
            });

            const q = query(collection(db, 'courts'), where(documentId(), '==', id));
            const querySnap = await getDocs(q);
            const { uid, visits, coordinates, courtName, address, municipality, province, surfaceType, numberOfHoops, numberOfCourts, rimHeight, rimCondition} = querySnap.docs[0].data();
            const courtData = {
                id: querySnap.docs[0].id,
                uid,
                visits,
                coordinates,
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

            return courtData;
        } catch(e: any) {
            console.log(e);
            return {} as MarkerDataInterface;
        }
    }

    async getCourtRating(courtId: string) {
        try {
            const querySnap = await getDocs(collection(db, `courts/${courtId}/ratings`));
            querySnap.docs.forEach((doc) => {
                console.log(doc.data())
            })
            const averageRating = querySnap.docs.reduce((acc, doc) => {
                const rating: number = doc.data().rating;
                console.log(rating);
                return acc + rating;
            }, 0);

            if(averageRating == 0) { return {averageRating, totalRatings: 0} }

            return {
                averageRating: averageRating/querySnap.docs.length,
                totalRatings: querySnap.docs.length
            };
        } catch(e: any) {
            console.log(e.code);
            return {
                averageRating: 0,
                totalRatings: 0
            }
        }
    }

    async rateCourt(uid: string, courtId: string, rating: number) {
        try {
            const refF = await setDoc(doc(db, `courts/${courtId}/ratings`, uid), {
                rating
            });
            return {
                message: 'Cancha calificada con éxito!',
                error: false
            }
        } catch(e: any) {
            console.log(e);

            switch (e.code) {
                case 'permission-denied':
                    return { error: true, message: 'Ya calificaste esta cancha anteriormente!' };

                default:
                    return { error: true, message: 'Error al comunicarse con el servidor, intente de nuevo mas tarde' };

            }
        }
    }
}

export default new MarkerService();