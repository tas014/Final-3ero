import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_CVP_FIREBASE_KEY,
  authDomain: "community-gaming-platform.firebaseapp.com",
  projectId: "community-gaming-platform",
  storageBucket: "community-gaming-platform.appspot.com",
  messagingSenderId: "461256009569",
  appId: "1:461256009569:web:606fa60ddbd01fbc33c720"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);

export {db, auth, storage}
