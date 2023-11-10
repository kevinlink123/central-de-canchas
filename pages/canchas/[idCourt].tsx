import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import markerService from "../../firebase/marker.service";
import { MarkerDataInterface } from "../../types/Map.interface";
import authService from "../../firebase/auth.service";
import { UserData } from "../../types/UserData.interface";
import Card from "../../components/Card";

export default function () {
    const [courtData, setCourtData] = useState<MarkerDataInterface>();
    const [courtCreator, setCourtCreator] = useState<UserData>();

    const router = useRouter();
    const { idCourt } = router.query;

    useEffect(() => {
        if (!idCourt) { return }

        const fetchCourtData = async () => {
            const fetchCourtData = await markerService.getCourt(idCourt as string);
            const courtCreator = await authService.getProfile(fetchCourtData?.uid);
            setCourtData(fetchCourtData);
            setCourtCreator(courtCreator);
        };
        fetchCourtData();
    }, [idCourt]);

    return (
        <div className="w-full min-h-full">
            {
                !courtData ? 
                <div>Loading...</div> :

                <div className="court-data-container flex flex-col justify-center items-center">
                    <div className="name-address">
                        <div className="my-4 text-6xl font-bold">{courtData.courtName}</div>
                        <div className="text-lg">{courtData.address}, <span className="font-medium">{courtData.municipality}</span>, <span className="font-medium">{courtData.province}</span></div>
                    </div>
                    <div className="info-cards-container grid grid-cols-6 w-3/4 my-4 items-stretch">
                        {/* <div className="info-card grid grid-rows-3 text-center items-center bg-gray-400 mx-6">
                            <div>LOGO</div>
                            <div className="text-center">Material del Suelo</div>
                            {courtData.surfaceType}
                        </div> */}
                        <Card logo={<div>LGOGOOG</div>} infoName={"Material del Suelo"} data={courtData.surfaceType} />
                        <div className="info-card grid grid-rows-3 text-center items-center bg-gray-400 mx-6">
                            <div>LOGO</div>
                            <div className="text-center">Cantidad de Canchas</div>
                            {courtData.numberOfCourts}
                        </div>
                        <div className="info-card grid grid-rows-3 text-center items-center bg-gray-400 mx-6">
                            <div>LOGO</div>
                            <div className="text-center">Cantidad de Aros Disponibles</div>
                            {courtData.numberOfHoops}
                        </div>
                        <div className="info-card flex flex-col justify-around items-center bg-gray-400 mx-6">
                            <div>LOGO</div>
                            <div className="text-center">Condición de los Aros</div>
                            {courtData.rimCondition}
                        </div>
                        <div className="info-card flex flex-col justify-around items-center bg-gray-400 mx-6">
                            <div>LOGO</div>
                            <div className="text-center">Altura de los Aros</div>
                            {courtData.rimHeight}
                        </div>
                        <div className="info-card flex flex-col justify-around items-center bg-gray-400 mx-6">
                            <div>LOGO</div>
                            <div className="text-center">Registrado por</div>
                            {courtCreator?.username}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
