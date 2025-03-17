"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, query } from "firebase/firestore";

export function FirebaseStatus() {
  const [authStatus, setAuthStatus] = useState<
    "checking" | "connected" | "error"
  >("checking");
  const [dbStatus, setDbStatus] = useState<"checking" | "connected" | "error">(
    "checking"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Comprobar conexión con Authentication
    const unsubscribe = onAuthStateChanged(
      auth,
      () => setAuthStatus("connected"),
      (error) => {
        setAuthStatus("error");
        setErrorMessage(error.message);
      }
    );

    // Comprobar conexión con Firestore
    const checkFirestore = async () => {
      try {
        // Intentar hacer una consulta simple
        const q = query(collection(db, "users"), limit(1));
        await getDocs(q);
        setDbStatus("connected");
      } catch (error) {
        setDbStatus("error");
        setErrorMessage((error as Error).message);
      }
    };

    checkFirestore();

    return () => unsubscribe();
  }, []);

  if (authStatus === "checking" || dbStatus === "checking") {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-700">Comprobando conexión con Firebase...</p>
      </div>
    );
  }

  if (authStatus === "error" || dbStatus === "error") {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700 font-medium">
          Error de conexión con Firebase
        </p>
        <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
        <div className="mt-2 text-sm">
          <p>Verifica que:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Has configurado correctamente las credenciales en
              src/lib/firebase.ts
            </li>
            <li>
              Has habilitado la autenticación por correo electrónico en Firebase
            </li>
            <li>Has creado la base de datos Firestore</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
      <p className="text-green-700">
        ✅ Conexión con Firebase establecida correctamente
      </p>
      <p className="text-green-600 text-sm mt-1">
        Authentication: Conectado | Firestore: Conectado
      </p>
    </div>
  );
}
