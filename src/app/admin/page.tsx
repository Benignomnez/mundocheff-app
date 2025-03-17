"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RoleProtectedRoute } from "@/components/auth/role-protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function AdminPage() {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        setUserCount(usersSnapshot.size);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <RoleProtectedRoute requiredRole="admin" fallbackPath="/">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Usuarios Registrados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {loading ? "..." : userCount}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recetas Publicadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">10</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Planes de Comida</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Crear Nueva Receta</Button>
              <Button className="w-full">Gestionar Usuarios</Button>
              <Button className="w-full" asChild>
                <Link href="/admin/assign-admin">
                  Asignar Rol de Administrador
                </Link>
              </Button>
              <Button className="w-full">Ver Estadísticas</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="pb-2 border-b">
                  <p className="font-medium">Nuevo usuario registrado</p>
                  <p className="text-sm text-muted-foreground">Hace 2 horas</p>
                </li>
                <li className="pb-2 border-b">
                  <p className="font-medium">Nueva receta publicada</p>
                  <p className="text-sm text-muted-foreground">Hace 5 horas</p>
                </li>
                <li>
                  <p className="font-medium">Actualización de sistema</p>
                  <p className="text-sm text-muted-foreground">Hace 1 día</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </RoleProtectedRoute>
  );
}
