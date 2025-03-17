// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7ACxr2nwDvBBlRyo0J4l41UgBnW2T7wU",
  authDomain: "mundocheff.firebaseapp.com",
  projectId: "mundocheff",
  storageBucket: "mundocheff.firebasestorage.app",
  messagingSenderId: "838897786829",
  appId: "1:838897786829:web:8084468407f33147542e84",
  measurementId: "G-BDH43R8QVP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const initializeAnalytics = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(app);
  }
  return null;
};
