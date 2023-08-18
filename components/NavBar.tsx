import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import UserActionButtons from './navBar/UserActionButtons';
import CredentialButtons from './navBar/CredentialButtons';

export default function NavBar() {
    const [isNavbarOpen, setNavBarState] = useState(false);
    const { user, loading } = useContext(AuthContext);

    const toggleNavbar = () => {
        setNavBarState(!isNavbarOpen);
    };

    const currentPage = useRouter();

    return (
        <nav className='sticky w-full top-0 left-0 border-b z-50 border-gray-200 bg-gray-50 shadow shadow-slate-200 rounded py-3'>
            <div className='relative flex flex-wrap justify-between items-center mx-auto'>
                <div className='main-logo-container flex items-center justify-start w-1/3'>
                    <div className='mx-2'>
                        <Link href='/'>
                            <img src='/court-finder-icon.png' alt="logo" className='lg:h-12 lg:w-12 h-10 mr-2 cursor-pointer rounded-full' />
                        </Link>
                    </div>
                    <span className='hidden lg:block lg:text-xl font-bold whitespace-nowrap font-mono lg:tracking-tighter'>Central de Canchas</span>
                    <span className='block lg:hidden -mx-2 lg:text-xl font-bold whitespace-nowrap font-mono lg:tracking-tighter'>CdC</span>
                </div>

                <div onClick={toggleNavbar} className='hamburguer-menu-button flex justify-center items-center lg:hidden w-1/3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 cursor-pointer border-2 rounded-md shadow shadow-slate-600 hover:bg-slate-200 active:bg-slate-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </div>

                <div className={'menu-buttons lg:flex lg:justify-center lg:items-center lg:w-1/4 w-full transition-transform order-last lg:order-none ' + (isNavbarOpen ? '' : ' hidden')}>
                    <ul className={'block text-center mt-3 lg:mt-0 w-full lg:flex lg:flex-row lg:justify-around lg:items-center'}>
                        <li onClick={toggleNavbar}>
                            <Link href='/mapa'>
                                <div className={'cursor-pointer w-1/2 lg:w-auto m-auto my-1 lg:my-0 px-5 py-1 text-slate-800 hover:text-slate-400 transition-all ' + (currentPage.pathname === '/mapa' ? "border rounded-2xl bg-slate-300 hover:text-slate-600" : "")}>MAPA</div>
                            </Link>
                        </li>
                        <li onClick={toggleNavbar}>
                            <Link href='/about'>
                                <div className={'cursor-pointer w-1/2 lg:w-auto m-auto my-1 lg:my-0 px-5 py-1 text-slate-800 hover:text-slate-400 transition-all ' + (currentPage.pathname === '/about' ? "border rounded-2xl bg-slate-300 hover:text-slate-600" : "")}>ABOUT</div>
                            </Link>
                        </li>
                        <li onClick={toggleNavbar}>
                            <Link href='/tutorial'>
                                <div className={'cursor-pointer w-1/2 lg:w-auto m-auto my-1 lg:my-0 px-5 py-1 text-slate-800 hover:text-slate-400 transition-all ' + (currentPage.pathname === '/proximamente' ? "border rounded-2xl bg-slate-300 hover:text-slate-600" : "")}>TUTORIAL</div>
                            </Link>
                        </li>
                        <li onClick={toggleNavbar}>
                            <Link href='/contacto'>
                                <div className={'cursor-pointer w-1/2 lg:w-auto m-auto my-1 lg:my-0 px-5 py-1 text-slate-800 hover:text-slate-400 transition-all ' + (currentPage.pathname === '/contacto' ? "border rounded-2xl bg-slate-300 hover:text-slate-600" : "")}>CONTACTO</div>
                            </Link>
                        </li>
                    </ul>
                </div>

                {loading ?
                    <div className='user-account-buttons flex flex-row justify-end w-1/3'>
                        <img
                            src="/loading.png"
                            alt="loading spinner"
                            width={20}
                            height={20}
                            className='animate-spin mx-10'
                        />
                    </div>
                    :
                    <div className='user-account-buttons flex flex-row justify-end  w-1/3'>
                        {user ?
                            <UserActionButtons></UserActionButtons> :
                            <CredentialButtons></CredentialButtons>
                        }
                    </div>
                }
            </div>
        </nav>
    )
}
