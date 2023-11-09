import React, {
    ChangeEvent,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from "react";
import markerService from "../../firebase/marker.service";
import { MarkerDataInterface } from "../../types/Map.interface";
import {
    CourtsTableData,
    PaginatedCourtsData,
} from "../../types/CourtsData.interface";
import { v4 as uuidv4 } from "uuid";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Headers } from "../../constans/tableHeaders.constant";
import ModalWithOptions from "../../components/ModalWithOptions";
import Modal from "../../components/Modal";
import { AuthContext } from "../../contexts/AuthContext";

export default function canchas() {
    const { user, loading } = useContext(AuthContext);

    const [courtsData, setCourtsData] = useState<CourtsTableData[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [lastCourtCalled, setLastCourtCalled] =
        useState<QueryDocumentSnapshot<DocumentData> | null>(null);

    const [loadingData, setLoadingData] = useState(false);
    const [error, setError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [aboutToDeleteCourt, setAboutToDeleteCourt] = useState<{
        index: number;
        courtName: string;
    }>({
        index: 0,
        courtName: "",
    });

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
        const newCourtsData = await markerService.getPaginatedCourtsData(
            lastCourtCalled
        );
        const newCourts = [...courtsData, ...newCourtsData.courtsData];
        setCourtsData(newCourts);
        setLastCourtCalled(newCourtsData.lastCourtCalled);
        setLoadingData(false);
    }

    async function deleteCourt() {
        const res = await markerService.deleteCourt(
            aboutToDeleteCourt.courtName
        );

        if (res?.error) {
            setAboutToDeleteCourt({
                index: 0,
                courtName: "",
            });

            setModalMessage(res.error);
            setIsModalOpen(false);
            setError(true);
            return;
        }
        const newCourts = [...courtsData];
        newCourts.splice(aboutToDeleteCourt.index, 1);
        setCourtsData(newCourts);
        setIsModalOpen(false);
        setAboutToDeleteCourt({
            index: 0,
            courtName: "",
        });
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

    const deleteIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
        </svg>
    );

    return (
        <div className="w-full min-h-screen overflow-x-auto">
            {courtsData.length ? null : (
                <div className="flex justify-center items-center w-full h-screen">
                    {loadingIcon}
                </div>
            )}
            <div
                className={`main-grid min-h-full w-[250%] lg:w-full grid grid-rows-[repeat(${
                    courtsData.length + 2
                },_minmax(0,_1fr))]`}
            >
                <div className="headers w-full grid grid-cols-[repeat(10,_minmax(0,_1fr))] text-[12px] lg:text-base">
                    {headers.map((header: string) => {
                        return (
                            <div
                                key={uuidv4()}
                                className="single-header flex justify-center items-center py-1 text-center bg-gray-200 border border-gray-300 font-basketball tracking-widest"
                            >
                                {Headers[header as keyof typeof Headers]}
                            </div>
                        );
                    })}
                    <div
                        key={uuidv4()}
                        className="single-header flex justify-center items-center py-1 text-center bg-gray-200 border border-gray-300 font-basketball tracking-widest"
                    >
                        acciones
                    </div>
                </div>
                {courtsData.map((singleCourtData, index) => {
                    const dataRow = [];
                    for (let key in singleCourtData) {
                        dataRow.push(
                            <div
                                key={uuidv4()}
                                className="single-cell flex justify-center items-center text-center py-4 px-2 border"
                            >
                                {singleCourtData[key as keyof CourtsTableData]}
                            </div>
                        );
                    }
                    dataRow.push(
                        <div
                            id={singleCourtData.courtName}
                            key={index}
                            className="single-cell flex justify-center items-center text-center py-4 px-2 border"
                        >
                            <button
                            onClick={(e) => {
                                if (!user) {
                                    setModalMessage(
                                        "Tenés que estar logueado para realizar cualquier acción"
                                    );
                                    setError(true);
                                    return;
                                }
                                setAboutToDeleteCourt({
                                    index: index,
                                    courtName: e.currentTarget.parentElement!.id,
                                });
                                setIsModalOpen(true);
                            }}
                            >
                                {deleteIcon}
                            </button>
                        </div>
                    );
                    return (
                        <div
                            key={uuidv4()}
                            className="row w-full grid grid-cols-[repeat(10,_minmax(0,_1fr))] text-[12px] lg:text-base"
                        >
                            {dataRow}
                        </div>
                    );
                })}
                {!courtsData.length ? null : loadingData ? (
                    <div className="flex justify-center items-center my-4">
                        {loadingIcon}
                    </div>
                ) : (
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
            {isModalOpen && (
                <ModalWithOptions
                    message={
                        "Seguro quiere eliminar la cancha permanentemente?"
                    }
                    closeModal={() => {
                        setIsModalOpen(false);
                    }}
                    confirmAction={() => {
                        deleteCourt();
                    }}
                ></ModalWithOptions>
            )}
            {error && (
                <Modal
                    message={modalMessage}
                    closeModal={() => setError(false)}
                />
            )}
        </div>
    );
}
