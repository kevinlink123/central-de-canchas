import { LatLngTuple } from "leaflet";

export interface MarkerDataInterface extends NewMarkerFormDataInterface {
    id: string;
    uid: string;
    coordinates: LatLngTuple;
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