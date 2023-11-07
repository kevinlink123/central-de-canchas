import { LatLngTuple } from "leaflet";

export interface MarkerDataInterface extends NewMarkerDataInterface {
    coordinates: LatLngTuple;
}

export interface NewMarkerDataInterface {
    uid: string;
    courtName: string;
    address: string;
    municipality: string;
    province: string;
    surfaceType: string;
    numberOfHoops: string;
    numberOfCourts: string;
    rimHeight: string;
    rimCondition: string;
}