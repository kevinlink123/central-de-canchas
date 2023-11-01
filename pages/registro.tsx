import { AnimatePresence } from 'framer-motion';
import Router from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react'
import Modal from '../components/Modal';
import authService from '../firebase/auth.service';

export default function register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [message, setMessage] = useState('');
    const [isModalOpen, setModalState] = useState(false);
    const [validations, setValidations] = useState<Number[]>([]);

    const [loading, setLoading] = useState(false);

    const checkmark = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    )

    const crossmark = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )

    function closeModal() {
        setModalState(false);
    }

    async function createNewUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        if (!username || username.length < 3) {
            setMessage('Debe ingresar un nombre de usuario de al menos 4 caracteres');
            setModalState(true);
            setLoading(false);
            return;
        }

        if (strength < 3) {
            setMessage('Contraseña poco segura.');
            setModalState(true);
            setLoading(false);
            return;
        }

        const { user, message } = await authService.createUser(username, email, password);
        if (user) {
            Router.push('/');
        }
        setMessage(message);
		setModalState(true);
		setLoading(false);
    }

    function validatePassword(e: any) {
        setPassword(e.target.value);
        const password: string = e.target.value;
        const passwordValidations = [
            (password.length > 7 ? 1 : 0),
            (password.search(/[A-Z]/) > -1 ? 1 : 0),
            (password.search(/[0-9]/) > -1 ? 1 : 0),
        ]

        setValidations([...passwordValidations]);

        const newstrength = passwordValidations.reduce((acc, curr) => acc + curr);
        setStrength(newstrength);
    }

    return (
        <div className='main mx-auto h-full my-10'>
            <div className='form-container m-auto flex flex-col justify-evenly items-center h-[90%] w-full lg:w-1/3 bg-slate-100 shadow-xl shadow-slate-400 rounded-3xl'>
                <div className='mx-auto w-full text-center'>
                    <img src='/court-finder-icon-big.jpg' className='rounded-full mx-auto my-4' width={70} />
                    <div className='mx-auto text-2xl font-mono'>Central de Canchas</div>
                    <div className='text-center text-sm italic'>Registrate para empezar a registrar nuevas canchas</div>
                </div>
                <form onSubmit={createNewUser} className='form my-6'>
                    <div className='username-input-container flex flex-col w-full relative border-b-2 after:content-[""] after:relative after:block after:h-0.5 after:w-full after:bg-violet-500 after:scale-x-0 after:origin-[0%] after:transition-transform after:duration-500 after:ease-in after:top-0.5 focus-within:border-transparent focus-within:after:scale-x-100'>
                        <input
                            className='border-none outline-none overflow-hidden z-10 w-full py-0.5 bg-transparent peer text-slate-700'
                            type='text'
                            name="text"
                            autoComplete='off'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label
                            htmlFor="text"
                            className={'-z-[0] absolute origin-[0%] transition-transform duration-500 peer-focus:scale-75 peer-focus:-translate-y-4 ' + (username ? '-translate-y-4 scale-75' : '')}
                        >
                            Nombre de usuario
                        </label>
                    </div>
                    <div className='email-input-container flex flex-col w-full relative border-b-2 my-4 after:content-[""] after:relative after:block after:h-0.5 after:w-full after:bg-violet-500 after:scale-x-0 after:origin-[0%] after:transition-transform after:duration-500 after:ease-in after:top-0.5 focus-within:border-transparent focus-within:after:scale-x-100'>
                        <input
                            className='border-none outline-none overflow-hidden z-10 w-full py-0.5 bg-transparent peer valid:text-green-400 invalid:text-red-400'
                            type='email'
                            name="email"
                            autoComplete='off'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                            htmlFor="email"
                            className={'-z-[0] absolute origin-[0%] transition-transform duration-500 peer-focus:scale-75 peer-focus:-translate-y-4 ' + (email ? '-translate-y-4 scale-75' : '')}
                        >
                            Email
                        </label>
                    </div>
                    <div className='password-input-container flex flex-col w-full relative border-b-2 my-4 after:content-[""] after:relative after:block after:h-0.5 after:w-full after:bg-violet-500 after:scale-x-0 after:origin-[0%] after:transition-transform after:duration-500 after:ease-in after:top-0.5 focus-within:border-transparent focus-within:after:scale-x-100'>
                        <input
                            className='border-none outline-none overflow-hidden z-10 w-full py-0.5 bg-transparent bg-none peer valid:text-green-500/90 invalid:text-red-400'
                            type='password'
                            name="password"
                            autoComplete='off'
                            value={password}
                            onChange={validatePassword}
                        />
                        <label
                            htmlFor="password"
                            className={'-z-[0] absolute origin-[0%] transition-transform duration-500 peer-focus:scale-75 peer-focus:-translate-y-4 ' + (password ? '-translate-y-4 scale-75' : '')}
                        >
                            Password
                        </label>
                    </div>
                    <div className='register-button-container mx-auto w-full mt-10'>
                        <button disabled={loading} className='text-center flex justify-center items-center w-full py-2 bg-blue-500 disabled:bg-blue-300 text-white rounded-lg'>
                            {loading ?
                                <img
                                    src="/loading.png"
                                    alt="loading spinner"
                                    width={20}
                                    height={20}
                                    className='animate-spin mx-10'
                                /> :
                                'REGISTRARSE'
                            }
                        </button>
                    </div>
                </form>

                <div className='strength-container flex w-4/5 h-10 px-10'>
                    <span className={'bar bg-gradient-to-r from-red-700 to-red-500 ' + (strength > 0 ? '' : 'shadow-[inset_0_40px_#2e2e2e]')}></span>
                    <span className={'bar bg-gradient-to-r from-red-500 to-yellow-400 ' + (strength > 1 ? '' : 'shadow-[inset_0_40px_#2e2e2e]')}></span>
                    <span className={'bar bg-gradient-to-r from-yellow-400 to-green-600 ' + (strength > 2 ? '' : 'shadow-[inset_0_40px_#2e2e2e]')}></span>
                </div>
                <div className='validations-explanations-container w-4/5 py-4'>
                    <ul className='list-disc'>
                        <div className='font-semibold'>
                            La contraseña deberá cumplir los siguientes requisitos:
                        </div>
                        <li className='ml-8'>Contener al menos 8 caracteres {validations[0] ? checkmark : crossmark}</li>
                        <li className='ml-8'>Contener al menos una letra mayúscula {validations[1] ? checkmark : crossmark}</li>
                        <li className='ml-8'>Contener al menos un número {validations[2] ? checkmark : crossmark}</li>
                    </ul>
                </div>
                <AnimatePresence
                    initial={false}
                    mode='wait'
                >
                    {(message && isModalOpen) && <Modal message={message} closeModal={() => closeModal()} />}
                </AnimatePresence>
            </div>
        </div>
    )
}
