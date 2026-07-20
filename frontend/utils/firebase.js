// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multiagent-d56c1.firebaseapp.com",
  projectId: "multiagent-d56c1",
  storageBucket: "multiagent-d56c1.firebasestorage.app",
  messagingSenderId: "176196742346",
  appId: "1:176196742346:web:5a3335e0e04d0960981833",
  measurementId: "G-PRNKKZMFXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider =  new GoogleAuthProvider();