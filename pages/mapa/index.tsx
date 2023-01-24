import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const MapPage = dynamic(() => import('../../components/mapa/MapPage'), {
	ssr: false
})

export default function index() {
	return (
		<>
			<AnimatePresence
			initial={true}
			mode='wait'
			>
				<motion.div
					initial={{ opacity: 0, transitionDuration: '300ms' }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<MapPage />
				</motion.div>
			</AnimatePresence>
		</>
	)
}