export interface ProvinceDataInterface {
    id: number;
    nombre: string;
    ciudades: CityDataInterface[]
}

export interface CityDataInterface {
    id: string;
    nombre: string;
}