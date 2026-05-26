import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shifraai-3efae.firebaseapp.com",
  projectId: "shifraai-3efae",
  storageBucket: "shifraai-3efae.firebasestorage.app",
  messagingSenderId: "445737978650",
  appId: "1:445737978650:web:15e55d664bd62f06edbaa3"
};

const app = initializeApp(firebaseConfig)
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}