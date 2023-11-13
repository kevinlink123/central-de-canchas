import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import authService from '../../firebase/auth.service';
import { DocumentData } from '@firebase/firestore';
import { UserData } from '../../types/UserData.interface';

export default function () {
    const [userData, setUserData] = useState<UserData>();
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { idPerfil } = router.query;

    useEffect(() => {
        if(!idPerfil) { return };

        const fetchUserData = async () => {
            const userData = await authService.getProfile(idPerfil as string);
            setUserData(userData);
            setLoading(false);
        }
        fetchUserData();
    }, [idPerfil])

    return (
        <div className='flex justify-center items-center'>
            {loading ?
                <div className='text-xl'>Cargando...</div>
                :
                <div className='flex flex-col justify-center items-center'>
                    <img src='/generic-profile-pic.png' alt="logo" className='mx-auto h-28 rounded-full' />
                    <div>ID de Perfil: {userData?.id}</div>
                    <div>Nombre de Usuario: {userData?.username}</div>
                    <div>Cantiad de Canchas registradas: {userData?.registeredCourts.length}</div>
                </div>
            }
        </div>
    )
}