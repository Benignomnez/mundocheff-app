"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserRole, hasRole } from "@/lib/user-roles";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
  fallbackPath?: string;
}

export function RoleProtectedRoute({
  children,
  requiredRole,
  fallbackPath = "/",
}: RoleProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hasRequiredRole, setHasRequiredRole] = useState<boolean | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!loading && user) {
        try {
          const userHasRole = await hasRole(user.uid, requiredRole);
          setHasRequiredRole(userHasRole);
        } catch (error) {
          console.error("Error al verificar rol:", error);
          setHasRequiredRole(false);
        } finally {
          setCheckingRole(false);
        }
      } else if (!loading && !user) {
        router.push("/auth/login");
      }
    };

    checkUserRole();
  }, [user, loading, requiredRole, router]);

  useEffect(() => {
    if (!checkingRole && hasRequiredRole === false) {
      router.push(fallbackPath);
    }
  }, [checkingRole, hasRequiredRole, router, fallbackPath]);

  if (loading || checkingRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || hasRequiredRole === false) {
    return null;
  }

  return <>{children}</>;
}
