import { LatLngTuple } from "leaflet";
import React, { ReactElement } from "react";

interface CardProps {
    logo: ReactElement;
    infoName: string | React.ReactNode;
    data: string | LatLngTuple | React.ReactNode;
}

export default function Card(props: CardProps) {
    const { data } = props;
    return (
        <div className="info-card flex flex-col justify-around items-center text-center w-full mx-6 px-2 py-4 rounded-lg bg-gray-100 shadow-gray-200 shadow-lg">
            <div className="w-full flex justify-center">{props.logo}</div>
            <div className="text-center">{props.infoName}</div>
            <div className="font-bold">{data}</div>
        </div>
    );
}
