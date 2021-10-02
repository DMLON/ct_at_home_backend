import admin from 'firebase-admin';
import credentials from './configs/firebaseCredentials.js'


const cred: any = credentials.firebase;
admin.initializeApp({
    credential: admin.credential.cert(cred)
});

console.log("Firebase connected.");

export const getFirestore = () => admin.firestore();