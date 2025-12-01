import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDwMEu4zahAw3ijPrsHxZY-T_yRLlHM0u0",
    authDomain: "training-8de37.firebaseapp.com",
    projectId: "training-8de37",
    storageBucket: "training-8de37.firebasestorage.app",
    messagingSenderId: "171801025660",
    appId: "1:171801025660:web:ff78cce4595e00b809bdf9",
    measurementId: "G-JZ8CC7NTYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider }
