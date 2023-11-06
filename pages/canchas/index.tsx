import React, { ReactElement, useEffect, useState } from "react";
import markerService from "../../firebase/marker.service";
import { MarkerDataInterface } from "../../types/Map.interface";
import {
    CourtsTableData,
    PaginatedCourtsData,
} from "../../types/CourtsData.interface";
import { v4 as uuidv4 } from 'uuid';
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Headers } from "../../constans/tableHeaders.constant";

export default function canchas() {
    const [courtsData, setCourtsData] = useState<CourtsTableData[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [lastCourtCalled, setLastCourtCalled] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        const fetchCourtsData = async () => {
            const courtsTableData: PaginatedCourtsData =
                await markerService.getPaginatedCourtsData(lastCourtCalled);
            setCourtsData(courtsTableData.courtsData);
            setLastCourtCalled(courtsTableData.lastCourtCalled);

            const headersArray = Object.keys(courtsTableData.courtsData[0]);
            setHeaders(headersArray);
        };
        fetchCourtsData();
    }, []);

    async function loadMoreCourts() {
        setLoadingData(true);
        const newCourtsData = (await markerService.getPaginatedCourtsData(lastCourtCalled));
        const newCourts = [...courtsData, ...newCourtsData.courtsData];
        setCourtsData(newCourts);
        setLastCourtCalled(newCourtsData.lastCourtCalled);
        setLoadingData(false);
    }

    const loadingIcon = (
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
    );

    return (
        <div className="w-full min-h-screen">
            {courtsData.length ? null : (
                <div className="flex justify-center items-center w-full h-screen">
                    {loadingIcon}
                </div>
            )}
            <div className={`main-grid min-h-full grid grid-rows-[repeat(${courtsData.length + 2},_minmax(0,_1fr))]`}>
                <div className="headers w-full grid grid-cols-[repeat(9,_minmax(0,_1fr))]">
                    {headers.map((header: string) => {
                        return (
                            <div key={uuidv4()} className="single-header flex justify-center items-center py-1 text-center bg-gray-200 border border-gray-300 font-basketball tracking-widest">
                                {Headers[header as keyof typeof Headers]}
                            </div>
                        );
                    })}
                </div>
                {courtsData.map((singleCourtData) => {
                    const dataRow = [];
                    for (let key in singleCourtData) {
                        dataRow.push(
                            <div key={uuidv4()} className="single-cell flex justify-center items-center text-center py-4 px-2 border">
                                {singleCourtData[key as keyof CourtsTableData]}
                            </div>
                        );
                    }
                    return (
                        <div key={uuidv4()} className="row w-full grid grid-cols-[repeat(9,_minmax(0,_1fr))]">
                            {dataRow}
                        </div>
                    );
                })}
                {!courtsData.length ? null : (
                    loadingData ? 
                    <div className="flex justify-center items-center my-4">
                        {loadingIcon}
                    </div> : 
                    <div className="footer-container flex justify-center items-center my-4 bg-gray rounded-b-[50px]">
                        <button
                            disabled={!lastCourtCalled}
                            onClick={loadMoreCourts}
                            className="px-4 py-4 border rounded-3xl cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed"
                        >
                            CARGAR MÁS
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
