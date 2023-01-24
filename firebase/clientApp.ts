import { initializeApp, getApps, getApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_CDC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_CDC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_CDC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_CDC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_CDC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_CDC_FIREBASE_APP_ID
};

const app = !getApps().length ? initializeApp(clientCredentials) : getApp()
const db = getFirestore(app);

export { app, db }
