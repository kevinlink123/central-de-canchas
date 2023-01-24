import React, { useState } from 'react'
import { motion } from 'framer-motion';

import Backdrop from './Backdrop';

interface ModalProps {
    closeModal: () => void;
    message: string;
}

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: '100vh',
        opacity: 0
    }
}

export default function Modal(props: ModalProps) {
    return (
        <Backdrop onClick={props.closeModal}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className='flex justify-center items-center'
                variants={dropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <div className='relative lg:w-full w-4/5 px-6 py-10 text-center font-mono text-xl text-slate-800 bg-white rounded-xl'>
                    {props.message}
                    <div className='absolute -top-4 -right-4'>
                    <svg onClick={props.closeModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 fill-slate-100 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                </div>
            </motion.div>

        </Backdrop>
    )
}
