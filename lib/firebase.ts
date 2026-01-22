import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC4LDGaigo4TJDSnCToPuIiOkcjJ8OpsoQ",
    authDomain: "dataclouder-dev.firebaseapp.com",
    projectId: "dataclouder-dev",
    storageBucket: "dataclouder-dev.firebasestorage.app",
    messagingSenderId: "514401908603",
    appId: "1:514401908603:web:dac63e04e6b0accd986fde"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
