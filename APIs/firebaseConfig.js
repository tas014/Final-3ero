import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_CVP_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_CVP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_CVP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_CVP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_CVP_FIREBASE_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_CVP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);

export {db, auth, storage}
