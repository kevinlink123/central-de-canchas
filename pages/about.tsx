import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const dropIn = {
    hidden: {
        x: '-100vh',
        opacity: 0
    },
    visible: {
        x: '0',
        opacity: 1,
        transition: {
            duration: '1500ms',
            type: 'spring',
            damping: 25,
            stiffness: 175
        }
    },
    exit: {
        x: '100vh',
        opacity: 0
    }
}

export default function about() {
    return (
        <motion.div
            className='mx-1 h-screen flex bg-[url(/bg-about.jpg)] bg-cover'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='big-image-container w-1/2 h-full'></div>
            <div className='about-us-text-section-container w-1/2 mx-10 my-10 text-right flex justify-end'>
                <motion.div
                    className='text-container w-4/5 text-slate-200'
                    variants={dropIn}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                >
                    <div className='text-4xl pb-1 font-basketball tracking-widest border-b-4 rounded-md border-b-slate-300'>DE JUGADORES PARA JUGADORES</div>
                    <div className='my-8 text-xl text-slate-800'>Poner en el mapa a las canchas argentinas y sus jugadores darle mayor visibilidad. <br></br>Todo aquel que quiera practicar el deporte recreativamente va a poder ver las canchas cerca suyo. Y aquel que quiera jugar de forma un poco mas competitiva puede recorrer nuevas canchas y enfrentarse a talentos todavia desconocidos.</div>
                </motion.div>
            </div>
        </motion.div>
    )
}
