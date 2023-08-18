import React from 'react'

const phoneIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
)

const emailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
)

const instagramIcon = (
    <img
        src="/instagram.png"
        alt="instagram icon"
        className='h-9 w-9'
    />
)

export default function contacto() {
    return (
        <div className='mx-1 h-screen flex flex-col justify-center items-center'>

            <div className='contact-info-container my-20'>
                <div className='text-center'>Creado con cariño por un jugador más</div>
                <div className='text-center'>Información de contacto:</div>
                <div className='contacts-container border m-auto flex justify-center items-center text-center mx-2 lg:mx-0 flex-wrap'>
                    <div className='w-1/2 h-20 border flex items-center justify-center'>
                        <div className='flex items-center justify-center'>{phoneIcon}</div>
                        <div className='w-1/2'>
                            <div className='font-semibold'>Whatsapp:</div>
                            <div>11-6955-5040</div>
                        </div>
                    </div>
                    <div className='w-1/2 h-20 border flex items-center justify-center'>
                        <div className='flex items-center justify-center'>{emailIcon}</div>
                        <div className='w-1/2'>
                            <div className='font-semibold'>Email:</div>
                            <div>cdc@hotmail.com</div>
                        </div>
                    </div>
                    <div className='w-1/2 h-20 border flex items-center justify-center'>
                        <div className='flex items-center justify-center'>{instagramIcon}</div>
                        <div className='w-1/2'>
                            <div className='font-semibold'>Instagram:</div>
                            <div>@Central de Canchas</div>
                        </div>
                    </div>
                    <div className='w-1/2 h-20 border flex items-center justify-center'>
                        <div className='flex items-center justify-center'>{phoneIcon}</div>
                        <div className='w-1/2'>
                            <div className='m-auto font-semibold'>Facebook</div>
                            <div>Central de Canchas</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
