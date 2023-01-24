import React from 'react'
import { motion } from 'framer-motion';

interface BackdropInterface {
    onClick: () => void;
    children: any;
}

export default function Backdrop(props: BackdropInterface) {
    return (
        <motion.div
            className='fixed z-50 h-screen w-screen top-0 left-0 bg-black/60 flex justify-center items-center'
            onClick={props.onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {props.children}
        </motion.div>
    )
}
