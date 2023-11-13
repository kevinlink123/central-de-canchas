import React, { ReactElement } from "react";

interface ButtonInterface {
    name: string;
    dark: boolean;
    onClick: () => void;
    icon?: ReactElement;
}

export default function Button(props: ButtonInterface) {
    return (
        <div
            onClick={props.onClick}
            className={
                "flex justify-center items-center cursor-pointer lg:px-4 px-3 py-3 mx-1 lg:mx-2 rounded-3xl shadow shadow-slate-600 " +
                (props.dark
                    ? "mx-auto bg-slate-600 hover:bg-slate-700 active:bg-slate-800"
                    : "bg-slate-100 hover:bg-slate-200 active:bg-slate-300")
            }
        >
            {props.icon}
            <button
                className={
                    props.dark
                        ? "lg:mx-1 text-slate-200 font-semibold text-sm"
                        : "lg:mx-1 text-slate-800 font-semibold text-sm"
                }
            >
                <div className="hidden uppercase lg:block">{props.name}</div>
            </button>
        </div>
    );
}
