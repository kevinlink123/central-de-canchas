import { getAuth } from "firebase/auth";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
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
            console.log('Marcador agregado con éxito')
            console.log('ID: ', docRef.id)

        } catch (e: any) {
            console.log(e.code);
        }
    }

    async getAllMarkers() {
        try {
            const querySnapshot = await getDocs(collection(db, 'courts'))
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