import Head from 'next/head'
import React from 'react'
import NavBar from '../components/NavBar'

export default function MainLayout({ children }: any) {
    return (
        <>
            <Head>
                <title>Central de Canchas</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <main className='mx-auto min-h-screen'>{children}</main>
            <footer className='w-full bg-black'>
                <div className='flex items-center h-20 mx-4 text-slate-400'>
                    <div className='w-1/3'>
                        <span style={{ color: 'rgb(148 163 184 / 1)' }}>@2022 Central de Canchas </span>
                        <span style={{ color: 'rgb(252 231 243 / 1)' }}>by KY</span>
                    </div>
                    <div className='w-1/3 flex justify-center'>
                        <img width={65} src="/KY-logo.png" className='rounded-full' alt="" />
                    </div>
                    <div className='text-white w-1/3 flex justify-end'>SOCIAL MEDIA</div>
                </div>
            </footer>
        </>
    )
}
