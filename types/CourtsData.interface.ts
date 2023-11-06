export interface CourtsTableData {
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

export interface PaginatedCourtsData {
    courtsData: CourtsTableData[];
    lastCourtCalled: any;
}