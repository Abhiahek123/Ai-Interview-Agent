
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "fir-4a71b.firebaseapp.com",
  projectId: "fir-4a71b",
  storageBucket: "fir-4a71b.firebasestorage.app",
  messagingSenderId: "372073250785",
  appId: "1:372073250785:web:6cc02e40183631751adca0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}