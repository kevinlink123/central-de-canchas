import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {
	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<img src='/court-finder-icon-big.jpg' alt="Logo" className='py-4 rounded-full' />
			<div className='text-center font-mono tracking-widest font-semibold text-2xl'>Bienvenido a Central de Canchas</div>
		</div>
	)
}
