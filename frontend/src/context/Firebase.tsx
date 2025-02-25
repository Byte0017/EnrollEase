// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVDAZIjIS7q-c34rqjOlQROeCDLR3GWfo",
  authDomain: "enrollease-f11b9.firebaseapp.com",
  projectId: "enrollease-f11b9",
  storageBucket: "enrollease-f11b9.firebasestorage.app",
  messagingSenderId: "337871276273",
  appId: "1:337871276273:web:d0dbd7684fd89e22e90150",
  measurementId: "G-EJ7N67HZ1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);

export const auth=getAuth();



