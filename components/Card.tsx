import React, { ReactElement } from "react";

interface CardProps {
    logo: ReactElement;
    infoName: string;
    data: string;
}

export default function Card(props: CardProps) {
    return (
        <div className="info-card grid grid-rows-3 text-center items-center bg-gray-400 mx-6">
            <div>{props.logo}</div>
            <div className="text-center">{props.infoName}</div>
            {props.data}
        </div>
    );
}
