// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsYK66T_JUQz28Tf_8LrKj15UDC2radpw",
    authDomain: "book-app-mern.firebaseapp.com",
    projectId: "book-app-mern",
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: "817508973924",
    appId: "1:817508973924:web:e8aec8abd040dbbfd64e71",
    measurementId: "G-356YTBKCX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);