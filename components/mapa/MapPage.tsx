import React from 'react';

import Map from './Map';

export default function MapPage() {
    return (
        <div className='mx-auto'>
            <div className="text-center font-mono text-2xl mt-4 -mb-2 underline underline-offset-8">Mapa de Canchas</div>
            <Map />
            <div className='faq mx-10 my-6 px-4 py-8 border-t-4 border-b-4 border-t-slate-600 border-b-slate-600 rounded-xl transition-all'>
                <div className='question font-bold underline'>
                    ¿Como registro una nueva cancha?
                </div>
                <div className='answer my-1 font-mono'>
                    Para registrar una nueva cancha clickea el icono
                    "
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 bg-black rounded-full inline-block" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    "
                    y coloca el marcador en la ubicación
                    de la cancha dentro del mapa. Si pusiste el marcador en un lugar incorrecto, podés reubicarlo arrastrandolo
                    en el mapa. <br />
                    Luego de especificar la ubicación, llená la información del formulario que está a la izquierda
                    del mapa. Una vez verificados los datos y la ubicación, clickea el boton "Agregar Marcador"
                    para registar la cancha nueva.
                    <br />
                    <br />
                    <b><i>NOTA: Si estas desde un smartphone o tableta, tapea dos veces en el lugar donde quieras ubicar el marcador para evitar fallos.</i></b>
                </div>
            </div>
        </div>
    )
}
