"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FirebaseStatus } from "@/components/firebase-status";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function FirebaseSetupPage() {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Configuración de Firebase</h1>

          <div className="mb-8">
            <FirebaseStatus />
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Paso 1: Crear un proyecto en Firebase</CardTitle>
                <CardDescription>
                  Primero necesitas crear un proyecto en la consola de Firebase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Ve a{" "}
                    <a
                      href="https://console.firebase.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      console.firebase.google.com
                    </a>
                  </li>
                  <li>Inicia sesión con tu cuenta de Google</li>
                  <li>Haz clic en "Añadir proyecto" o "Crear proyecto"</li>
                  <li>
                    Asigna un nombre al proyecto, por ejemplo "mundochef-app"
                  </li>
                  <li>
                    Puedes habilitar Google Analytics si lo deseas (recomendado)
                  </li>
                  <li>Haz clic en "Crear proyecto"</li>
                </ol>
                <Button asChild className="mt-2">
                  <a
                    href="https://console.firebase.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ir a la consola de Firebase
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paso 2: Registrar tu aplicación web</CardTitle>
                <CardDescription>
                  Registra tu aplicación web en Firebase para obtener las
                  credenciales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    En la consola de Firebase, haz clic en el icono de la web
                    (&lt;/&gt;) para añadir una aplicación web
                  </li>
                  <li>
                    Asigna un nombre a tu aplicación, por ejemplo "MundoChef
                    Web"
                  </li>
                  <li>
                    Marca la opción "También configurar Firebase Hosting" si
                    planeas desplegar la aplicación en Firebase
                  </li>
                  <li>Haz clic en "Registrar app"</li>
                  <li>
                    Firebase te mostrará un objeto de configuración que
                    necesitaremos para nuestra aplicación
                  </li>
                </ol>
                <div className="mt-4">
                  <Button
                    onClick={() => setShowConfig(!showConfig)}
                    variant="outline"
                  >
                    {showConfig ? "Ocultar" : "Mostrar"} ejemplo de
                    configuración
                  </Button>

                  {showConfig && (
                    <pre className="mt-4 p-4 bg-muted rounded-md overflow-x-auto text-sm">
                      {`// Ejemplo de configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6",
  authDomain: "mundochef-app.firebaseapp.com",
  projectId: "mundochef-app",
  storageBucket: "mundochef-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890",
  measurementId: "G-ABCDEF1234"
};`}
                    </pre>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Paso 3: Actualizar la configuración en la aplicación
                </CardTitle>
                <CardDescription>
                  Actualiza el archivo de configuración de Firebase con tus
                  credenciales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Abre el archivo{" "}
                    <code className="bg-muted px-1 py-0.5 rounded">
                      src/lib/firebase.ts
                    </code>{" "}
                    en tu editor
                  </li>
                  <li>
                    Reemplaza el objeto{" "}
                    <code className="bg-muted px-1 py-0.5 rounded">
                      firebaseConfig
                    </code>{" "}
                    con el que obtuviste de Firebase
                  </li>
                  <li>Guarda el archivo</li>
                </ol>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
                  <p className="text-yellow-800">
                    <strong>Importante:</strong> Nunca compartas tus
                    credenciales de Firebase públicamente. En un entorno de
                    producción, deberías usar variables de entorno para
                    almacenar estas credenciales.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Paso 4: Habilitar la autenticación por correo electrónico
                </CardTitle>
                <CardDescription>
                  Configura la autenticación por correo electrónico y contraseña
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    En la consola de Firebase, ve a "Authentication" en el menú
                    lateral
                  </li>
                  <li>Haz clic en "Comenzar" o "Get started"</li>
                  <li>
                    En la pestaña "Sign-in method", haz clic en "Email/Password"
                  </li>
                  <li>Activa la opción "Email/Password" (primera opción)</li>
                  <li>Haz clic en "Guardar"</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paso 5: Configurar Firestore Database</CardTitle>
                <CardDescription>
                  Configura Firestore Database para almacenar las preferencias
                  de los usuarios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    En la consola de Firebase, ve a "Firestore Database" en el
                    menú lateral
                  </li>
                  <li>Haz clic en "Crear base de datos"</li>
                  <li>
                    Selecciona "Comenzar en modo de prueba" (para desarrollo)
                  </li>
                  <li>
                    Selecciona la ubicación del servidor más cercana a tus
                    usuarios
                  </li>
                  <li>Haz clic en "Habilitar"</li>
                </ol>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
                  <p className="text-yellow-800">
                    <strong>Nota:</strong> El modo de prueba permite acceso
                    completo a la base de datos durante 30 días. Para un entorno
                    de producción, deberías configurar reglas de seguridad
                    adecuadas.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paso 6: Probar la conexión</CardTitle>
                <CardDescription>
                  Verifica que la conexión con Firebase funciona correctamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Una vez que hayas completado todos los pasos anteriores,
                  recarga esta página para verificar la conexión con Firebase.
                </p>
                <p>
                  Si la conexión es exitosa, verás un mensaje verde en la parte
                  superior de esta página.
                </p>
                <p>
                  Si hay algún error, verás un mensaje rojo con detalles sobre
                  el problema.
                </p>

                <div className="flex space-x-4 mt-4">
                  <Button onClick={() => window.location.reload()}>
                    Recargar página
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Volver al inicio</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
