import { getAuth, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { app } from '../firebase/clientApp';

export default function AuthProvider(props: any) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = getAuth(app).onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{user: user, loading: loading}}>{props.children}</AuthContext.Provider>
    )
}
