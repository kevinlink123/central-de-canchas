import React, { useState } from 'react'
import { motion } from 'framer-motion';

import Backdrop from './Backdrop';

interface ModalProps {
    confirmAction: () => void;
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

export default function ModalWithOptions(props: ModalProps) {

    const [loading, setLoading] = useState(false);

    const loadingIcon = (
        <svg
            className="asd animate-custom-spin mx-16"
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
                    <div>
                        <div>{props.message}</div>
                        <div className="flex justify-center items-center mt-6">
                            {
                                !loading ? 
                                <div onClick={() => {
                                    setLoading(true)
                                    props.confirmAction()
                                }} className="flex justify-center items-center cursor-pointer lg:px-10 px-3 py-3 mx-12 rounded-3xl shadow shadow-slate-600 bg-slate-100 hover:bg-slate-200 active:bg-slate-300">SI</div> :
                                <div>
                                    {loadingIcon}
                                </div>
                            }
                            <div onClick={props.closeModal} className="flex justify-center items-center cursor-pointer lg:px-10 px-3 py-3 mx-12 rounded-3xl shadow shadow-slate-600 bg-slate-100 hover:bg-slate-200 active:bg-slate-300">NO</div>
                        </div>
                    </div>
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
