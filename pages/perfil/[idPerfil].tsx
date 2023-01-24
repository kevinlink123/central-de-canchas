import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../contexts/AuthContext';
import authService from '../../firebase/auth.service';
import { DocumentData } from '@firebase/firestore';

export async function getServerSideProps() {
    return {
        props: {},
    };
}

export default function () {
    const [userData, setUserData] = useState<DocumentData | undefined>();
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { idPerfil } = router.query;

    useEffect(() => {
        const fetchUserData = async () => {
            console.log(idPerfil);
            const userData = await authService.getProfile(idPerfil);
            setUserData(userData);
            setLoading(false);
        }
        fetchUserData();
    }, [])

    return (
        <div className='flex justify-center items-center'>
            {loading ?
                <div className='text-xl'>Cargando...</div>
                :
                <div className='flex flex-col justify-center items-center'>
                    <img src='/generic-profile-pic.png' alt="logo" className='mx-auto h-28 rounded-full' />
                    <div>ID de Perfil: {userData?.id}</div>
                    <div>Nombre de Usuario: {userData?.username}</div>
                </div>
            }
        </div>
    )
}