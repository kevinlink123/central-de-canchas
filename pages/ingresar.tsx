import { AnimatePresence } from 'framer-motion'
import Router from 'next/router';
import React, { FormEvent, useState } from 'react'
import Modal from '../components/Modal'
import authService from '../firebase/auth.service'

export default function ingresar() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [message, setMessage] = useState('');
	const [isModalOpen, setModalState] = useState(false);

	async function loginUser(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		const { user, message } = await authService.loginUser(email, password);
		if (user) {
			Router.push('/');
		}
		setMessage(message);
		setModalState(true);
		setLoading(false);
	}

	function closeModal() {
		setModalState(false);
	}

	return (
		<div className='main mx-auto h-full z- my-10'>
			<div className='form-container m-auto flex flex-col justify-between items-center h-5/6 w-2/3 lg:w-1/3 -z-40 bg-slate-100 shadow-xl shadow-slate-400 rounded-3xl'>
				<div className='mx-auto w-full text-center mt-10'>
					<img src='/court-finder-icon-big.jpg' className='rounded-full mx-auto my-4' width={70} />
					<div className='mx-auto text-2xl font-mono'>Central de Canchas</div>
					<div className='text-center text-sm italic'>Ingrese con sus credenciales</div>
				</div>
				<form onSubmit={loginUser} className='form my-2'>
					<div className='email-input-container flex flex-col w-full relative border-b-2 after:content-[""] after:relative after:block after:h-0.5 after:w-full after:bg-violet-500 after:scale-x-0 after:origin-[0%] after:transition-transform after:duration-500 after:ease-in after:top-0.5 focus-within:border-transparent focus-within:after:scale-x-100'>
						<input
							className='border-none outline-none overflow-hidden w-full py-0.5 bg-transparent peer valid:text-green-400 invalid:text-red-400'
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
							className='border-none outline-none overflow-hidden w-full py-0.5 bg-transparent bg-none peer valid:text-green-400 invalid:text-red-400'
							type='password'
							name="password"
							autoComplete='off'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label
							htmlFor="password"
							className={'-z-[0] absolute origin-[0%] transition-transform duration-500 peer-focus:scale-75 peer-focus:-translate-y-4 ' + (password ? '-translate-y-4 scale-75' : '')}
						>
							Password
						</label>
					</div>
					<div className='register-button-container mx-auto w-full mt-10'>
						<button disabled={loading} className='text-center flex justify-center items-center w-full py-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-300'>
							{loading ?
								<img
									src="/loading.png"
									alt="loading spinner"
									width={20}
									height={20}
									className='animate-spin mx-10'
								/> :
								'LOGIN'
							}
						</button>
					</div>
				</form>
				<div className='dont-have-an-account-yet-container text-center mb-10'>
					Todavía no estás registrado? Hacé <span className='underline text-blue-400 cursor-pointer'>click acá</span>
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
