import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import markerService from "../../firebase/marker.service";
import { MarkerDataInterface } from "../../types/Map.interface";
import authService from "../../firebase/auth.service";
import { UserData } from "../../types/UserData.interface";
import Card from "../../components/Card";
import { Headers, courtDataTitles } from "../../constans/court.constants";

export default function () {
    const [courtData, setCourtData] = useState<MarkerDataInterface>();
    const [courtCreator, setCourtCreator] = useState<UserData>();

    const router = useRouter();
    const { idCourt } = router.query;

    useEffect(() => {
        if (!idCourt) { return }

        const fetchCourtData = async () => {
            const fetchCourtData = await markerService.getCourt(idCourt as string);
            const courtCreator = await authService.getProfile(fetchCourtData.uid);
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
                    <div className="info-cards-container grid grid-cols-6 w-3/4 h-52 my-4 items-stretch">
                        {
                            courtDataTitles.map((title) => {
                                return (
                                    <Card logo={<div>LOOGOO</div>} infoName={Headers[title as keyof typeof Headers]} data={courtData[title as keyof MarkerDataInterface]}/>
                                )
                            })
                        }
                        <Card logo={<div>LOOGOO</div>} infoName="Cancha registrada por" data={courtCreator?.username || ''} />
                    </div>
                </div>
            }
        </div>
    );
}
