import { LatLngTuple } from "leaflet";

export interface MarkerDataInterface extends NewMarkerDataInterface {
    coordinates: LatLngTuple;
}

export interface NewMarkerDataInterface extends NewMarkerFormDataInterface {
    uid: string;
}

export interface NewMarkerFormDataInterface {
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