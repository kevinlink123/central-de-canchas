import Link from 'next/link'
import Router from 'next/router'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import authService from '../../firebase/auth.service'
import NavBarButton from './NavBarButton'

const loginIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
)

const registerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6 stroke-slate-200">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>
)

export default function UserActionButtons() {

    async function logout() {
        await authService.logout();
        Router.push('/');
    }
    
    const { user, loading } = useContext(AuthContext);

    return (
        <>
            <NavBarButton dark={false} to={'/perfil' + '/' + user?.uid} name='perfil' icon={loginIcon} />
            <Link href='/'>
                <div className={'flex justify-center items-center cursor-pointer lg:px-4 px-3 py-3 mx-1 lg:mx-2 rounded-3xl shadow shadow-slate-600 bg-slate-600 hover:bg-slate-700 active:bg-slate-800'}>
                    {registerIcon}
                    <button onClick={logout} className='lg:mx-1 text-slate-200 font-semibold text-sm'>
                        <div className='hidden uppercase lg:block'>cerrar sesión</div>
                    </button>
                </div>
            </Link>
        </>
    )
}
