"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getUserInitials = () => {
    if (!user || !user.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-semibold text-emerald-600">
                MundoChef
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/browse"
              className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            >
              Browse
            </Link>
            <Link
              href="/meal-plan"
              className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            >
              Meal Plans
            </Link>
            <Link
              href="/onboarding"
              className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            >
              Preferences
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search recipes..."
                className="w-[200px] lg:w-[300px]"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback className="bg-emerald-600 text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/onboarding" className="w-full">
                      Mis Preferencias
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 hidden md:inline-flex"
                asChild
              >
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
            )}

            <button
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/browse"
                className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                href="/meal-plan"
                className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Meal Plans
              </Link>
              <Link
                href="/onboarding"
                className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Preferences
              </Link>
              {!user && (
                <Link
                  href="/auth/login"
                  className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
              {user && (
                <>
                  <Link
                    href="/profile"
                    className="px-3 py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 text-left text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>
            <div className="mt-4">
              <Input
                type="search"
                placeholder="Search recipes..."
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
