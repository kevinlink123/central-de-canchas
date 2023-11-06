import { DocumentData } from "firebase/firestore";
import React, { ReactElement, useEffect, useState } from "react";
import markerService from "../../firebase/marker.service";
import { MarkerDataInterface } from "../../types/Map.interface";
import {
    CourtsTableData,
    PaginatedCourtsData,
} from "../../types/CourtsData.interface";

export default function canchas() {
    const [courtsData, setCourtsData] = useState<CourtsTableData[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [lastCourtCalled, setLastCourtCalled] = useState();

    useEffect(() => {
        const fetchCourtsData = async () => {
            const courtsTableData: PaginatedCourtsData =
                await markerService.getPaginatedCourtsData("");
            setCourtsData(courtsTableData.courtsData);
            setLastCourtCalled(courtsTableData.lastCourtCalled);

            const headersArray = Object.keys(courtsTableData.courtsData[0]);
            setHeaders(headersArray);
        };
        fetchCourtsData();
    }, []);

    return (
        <div className="w-full min-h-screen">
            {courtsData.length ? null : (
                <div className="flex justify-center items-center w-full h-screen">
                    <svg
                        className="asd animate-custom-spin"
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            opacity="0.2"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            fill="currentColor"
                        />
                        <path
                            d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
                            fill="currentColor"
                        />
                        <path
                            d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            )}
            <div className="main-grid grid grid-rows-[repeat(8,_minmax(0,_1fr))]">
                <div className="headers w-full grid grid-cols-[repeat(9,_minmax(0,_1fr))]">
                    {headers.map((header) => {
                        return (
                            <div className="single-header flex justify-center items-center text-center bg-gray-200 border border-gray-300 font-basketball tracking-widest">
                                {header}
                            </div>
                        );
                    })}
                </div>
                {courtsData.map((singleCourtData) => {
                    const dataRow = [];
                    for (let key in singleCourtData) {
                        dataRow.push(
                            <div className="single-cell flex justify-center items-center text-center py-4 px-2 border">
                                {singleCourtData[key as keyof CourtsTableData]}
                            </div>
                        );
                    }
                    return (
                        <div className="row w-full grid grid-cols-[repeat(9,_minmax(0,_1fr))]">
                            {dataRow}
                        </div>
                    );
                })}
                {!courtsData.length ? null : (
                    <div className="footer-container flex justify-end items-center bg-gray rounded-b-[50px]">
                        <div className="flex mr-6 border border-gray-400 divide-x divide-black rounded-2xl">
                            <div className="px-4 py-2 cursor-pointer">
                                Previous
                            </div>
                            <div className="px-4 py-2 cursor-pointer">Next</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
