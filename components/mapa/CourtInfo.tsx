import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';

import { MarkerDataInterface } from '../../types/Map.interface';
import NavBarButton from '../navBar/NavBarButton';

interface CourtInfoPropsInterface {
    selectedMarker: MarkerDataInterface;
}

const fadeIn = {
    hidden: {
        opacity: 0
    },
    visible: {
        x: '0',
        opacity: 1,
        transition: {
            duration: 1,
            type: 'spring',
            damping: 500,
            stiffness: 500
        }
    },
    exit: {
        x: '',
        opacity: 0
    }
}

export default function CourtInfo(props: CourtInfoPropsInterface) {
    const isMarkerSelected = !(Object.keys(props.selectedMarker).length === 0);
    return (
        <div className='court-info-container relative block lg:flex lg:flex-col lg:w-1/4 w-5/6 h-screen m-auto justify-center items-center'>

            <AnimatePresence
                initial={true}
                mode='wait'
            >
                {!isMarkerSelected &&
                    <motion.div
                        className='select-marker-message absolute z-10 flex justify-center items-center text-2xl text-center font-mono w-full h-full'
                        variants={fadeIn}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                    >
                        <div className=''>Selecciona una cancha del mapa</div>
                    </motion.div>
                }
            </AnimatePresence>
            <div className={'flex flex-col justify-between border-2 rounded-lg border-gray-200 h-5/6 lg:mr-6 ' + (!isMarkerSelected ? 'blur-sm' : '')}>
                <div className='text-center mt-8 font-bold font-mono text-lg tracking-tight'>Caracteristicas de la cancha</div>
                <div className='court-characteristics flex flex-wrap justify-center'>
                    <div className='flex flex-col mx-2 py-6 px-1 justify-center items-center border-2 rounded-2xl basis-2/5 transition-transform animate-fadeIn'>
                        <div className='text-center font-mono tracking-wider underline underline-offset-4'>MATERIAL DEL SUELO</div>
                        <div className='font-bold mt-2 text-center'>
                            {isMarkerSelected ? props.selectedMarker.surfaceType : 'content'}
                        </div>
                    </div>

                    <div className='flex flex-col mx-2 py-6 px-1 justify-center items-center border-2 rounded-2xl basis-2/5 transition-transform animate-fadeIn'>
                        <div className='text-center font-mono tracking-wider underline underline-offset-4'>CANTIDAD DE CANCHAS</div>
                        <div className='font-bold mt-2 text-center'>
                            {isMarkerSelected ? props.selectedMarker.numberOfCourts : 'content'}
                        </div>
                    </div>

                    <div className='flex flex-col mx-2 my-3 py-6 px-1 justify-center items-center border-2 rounded-2xl basis-2/5 transition-transform animate-fadeIn'>
                        <div className='text-center font-mono tracking-wider underline underline-offset-4'>CANTIDAD DE AROS</div>
                        <div className='font-bold mt-2 text-center'>
                            {isMarkerSelected ? props.selectedMarker.numberOfHoops : 'content'}
                        </div>
                    </div>

                    <div className='flex flex-col mx-2 my-3 py-6 px-1 justify-center items-center border-2 rounded-2xl basis-2/5 transition-transform animate-fadeIn'>
                        <div className='text-center font-mono tracking-wider w-4/5 underline underline-offset-4'>ALTURA DE LOS AROS</div>
                        <div className='font-bold mt-2 text-center'>
                            {isMarkerSelected ? props.selectedMarker.rimHeight : 'content'}
                        </div>
                    </div>

                    <div className='flex flex-col my-3 py-6 px-6 justify-center items-center border-2 rounded-2xl transition-transform animate-fadeIn'>
                        <div className='text-center font-mono tracking-wider w-4/5 underline underline-offset-4'>CONDICION DE LOS AROS</div>
                        <div className='font-bold mt-2 text-center'>
                            {isMarkerSelected ? props.selectedMarker.rimCondition : 'content'}
                        </div>
                    </div>
                </div>

                <div className="submit-button-container flex justify-center items-center mb-10">
                    <NavBarButton dark={false} to={'/canchas' + '/' + props.selectedMarker.id} name='Página de la Cancha' icon={<></>} />
                </div>
            </div>
        </div>
    )
}
