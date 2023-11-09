import { createUserWithEmailAndPassword, ErrorFn, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { app, db } from "./clientApp";

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

    async getProfile(profileId: any) {
        try {
            const docRef = doc(db, 'users', profileId);
            const docSnapshot = await getDoc(docRef);
            const userData = docSnapshot.data();
            return userData;
        } catch (e: any) {
            console.log(e.code);
        }
    }
}

export default new AuthService();