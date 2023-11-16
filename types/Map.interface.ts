import { LatLngTuple } from "leaflet";

export interface MarkerDataInterface extends NewMarkerFormDataInterface {
    id: string;
    uid: string;
    coordinates: LatLngTuple;
    favoritesCount: number;
}

export interface NewMarkerFormDataInterface {
    visits: number;
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