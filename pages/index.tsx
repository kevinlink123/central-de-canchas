import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Home: NextPage = () => {
	return (
		<div className='mx-auto h-5/6'>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className='flex flex-col justify-center items-center h-full'>
				<img src='/court-finder-icon-big.jpg' alt="Logo" className='py-4 rounded-full' />
				<div className='text-center font-mono tracking-widest font-semibold text-2xl'>Bienvenido a Central de Canchas</div>
			</div>
		</div>
	)
}

export default Home
