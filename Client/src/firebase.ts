/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-opensay-app.firebaseapp.com",
  projectId: "mern-opensay-app",
  storageBucket: "mern-opensay-app.appspot.com",
  messagingSenderId: "944096107850",
  appId: "1:944096107850:web:e54ad724bb0613dc7175b3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
