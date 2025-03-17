"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RoleProtectedRoute } from "@/components/auth/role-protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { assignRole } from "@/lib/user-roles";
import { toast } from "sonner";

export default function AssignAdminPage() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAssignAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId.trim()) {
      toast.error("Por favor, introduce un ID de usuario válido");
      return;
    }

    setLoading(true);

    try {
      await assignRole(userId, "admin");
      toast.success("Rol de administrador asignado correctamente");
      setUserId("");
    } catch (error) {
      console.error("Error al asignar rol de administrador:", error);
      toast.error("Error al asignar rol de administrador");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleProtectedRoute requiredRole="admin" fallbackPath="/">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Asignar Rol de Administrador
        </h1>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Asignar Administrador</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAssignAdmin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="userId" className="text-sm font-medium">
                  ID de Usuario
                </label>
                <Input
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Introduce el ID del usuario"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Asignando..." : "Asignar Rol de Administrador"}
              </Button>
            </form>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                Nota: El ID de usuario se puede encontrar en la base de datos de
                Firebase. Esta acción otorgará permisos de administrador al
                usuario especificado.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </RoleProtectedRoute>
  );
}
