// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Ejemplo de configuración de Firebase
// Reemplaza estos valores con los que obtengas de tu proyecto en Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id",
  measurementId: "tu-measurement-id", // Opcional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Instrucciones:
// 1. Copia este archivo y renómbralo a firebase.ts
// 2. Reemplaza los valores de firebaseConfig con los que obtengas de tu proyecto en Firebase
// 3. Asegúrate de que firebase.ts esté incluido en .gitignore para no subir tus credenciales al repositorio
