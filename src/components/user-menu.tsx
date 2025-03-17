"use client";

import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasRole } from "@/lib/user-roles";

export function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        try {
          const userIsAdmin = await hasRole(user.uid, "admin");
          setIsAdmin(userIsAdmin);
        } catch (error) {
          console.error("Error al verificar rol de administrador:", error);
        }
      }
    };

    checkAdminRole();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/login">Iniciar Sesión</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/auth/register">Registrarse</Link>
        </Button>
      </div>
    );
  }

  // Obtener las iniciales del email del usuario
  const initials = user.email ? user.email.substring(0, 2).toUpperCase() : "US";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          aria-label="Menú de usuario"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || ""} alt={user.email || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/meal-plan" className="cursor-pointer w-full">
            Mi Plan de Comidas
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/onboarding" className="cursor-pointer w-full">
            Mis Preferencias
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin" className="cursor-pointer w-full">
                Panel de Administración
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
