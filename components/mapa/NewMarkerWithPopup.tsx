import React from 'react'

export default function NewMarkerWithPopup() {
    return (
        <div className='flex justify-center items-center flex-col'>
            <div className='text-center font-mono'>Asegurate de que la ubicacion en el mapa y los datos de la cancha son correctos</div>
            <button className='action-button mt-2 px-6 py-2 text-slate-800 font-semibold rounded-xl shadow shadow-slate-600 cursor-pointer bg-slate-100 hover:bg-slate-200 active:bg-slate-300'>
                <div>Cancelar</div>
            </button>
        </div>
    )
}

