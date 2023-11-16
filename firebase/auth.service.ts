import { createUserWithEmailAndPassword, ErrorFn, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, documentId, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { app, db } from "./clientApp";
import { UserData } from "../types/UserData.interface";

class AuthService {
    auth;

    constructor() {
        this.auth = getAuth(app);
    }

    async loginUser(email: string, password: string) {
        try {
            const user = await signInWithEmailAndPassword(this.auth, email, password);
            return { user: user, message: '' };
        } catch (e: any) {
            console.log(e.code);

            switch (e.code) {
                case 'auth/wrong-password':
                    return { user: null, message: 'Credenciales incorrectas, intente de nuevo.' };

                default:
                    return { user: null, message: 'Error al comunicarse con el servidor, intente de nuevo mas tarde' };

            }
        }
    }

    async logout() {
        await getAuth(app).signOut()
    }

    async createUser(username: string, email: string, password: string) {
        try {
            const user = await createUserWithEmailAndPassword(this.auth, email, password);

            const newDocRef = await setDoc(doc(db, 'users', user.user.uid), {
                id: user.user.uid,
                username: username,
                email: email,
                registeredCourts: [],
                roles: []
            });

            console.log('usuario registrado con ID: ', user.user.uid);
            console.log(user.user);
            return { user: user, message: 'Usuario registrado con éxito' };

        } catch (e: any) {
            console.log(e.code);
            switch (e.code) {
                case 'auth/email-already-in-use':
                    return { user: null, message: 'Ya existe un usuario registrado con ese email' };

                case 'auth/invalid-email':
                    return { user: null, message: 'El email proporcionado es inválido' };

                default:
                    console.log(e);
                    return { user: null, message: 'Error al comunicarse con el servidor, intente de nuevo mas tarde' };
            }
        }
    }

    async getProfile(profileId: string) {
        try {
            const q = query(collection(db, 'users'), where(documentId(), '==', profileId));
            const docSnapshot = await getDocs(q);
            const { id, email, registeredCourts, roles, username } = docSnapshot.docs[0].data();
            const userData = {
                id,
                email,
                registeredCourts,
                roles,
                username
            }
            return userData;
        } catch (e: any) {
            console.log(e.code);
            return {} as UserData;
        }
    }
}

export default new AuthService();