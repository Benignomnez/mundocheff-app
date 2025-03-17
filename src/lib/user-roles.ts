import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type UserRole = "user" | "admin";

export interface UserRoles {
  roles: UserRole[];
}

/**
 * Obtiene los roles de un usuario desde Firestore
 * @param userId ID del usuario
 * @returns Objeto con los roles del usuario
 */
export async function getUserRoles(userId: string): Promise<UserRoles> {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists() && userDoc.data().roles) {
      return { roles: userDoc.data().roles as UserRole[] };
    }

    // Si no existe, crear un documento con el rol por defecto
    const defaultRoles: UserRoles = { roles: ["user"] };
    await setDoc(
      doc(db, "users", userId),
      { roles: defaultRoles.roles },
      { merge: true }
    );

    return defaultRoles;
  } catch (error) {
    console.error("Error al obtener roles de usuario:", error);
    return { roles: ["user"] }; // Rol por defecto en caso de error
  }
}

/**
 * Verifica si un usuario tiene un rol específico
 * @param userId ID del usuario
 * @param role Rol a verificar
 * @returns true si el usuario tiene el rol, false en caso contrario
 */
export async function hasRole(
  userId: string,
  role: UserRole
): Promise<boolean> {
  const userRoles = await getUserRoles(userId);
  return userRoles.roles.includes(role);
}

/**
 * Asigna un rol a un usuario
 * @param userId ID del usuario
 * @param role Rol a asignar
 */
export async function assignRole(
  userId: string,
  role: UserRole
): Promise<void> {
  try {
    const userRoles = await getUserRoles(userId);

    if (!userRoles.roles.includes(role)) {
      userRoles.roles.push(role);
      await setDoc(
        doc(db, "users", userId),
        { roles: userRoles.roles },
        { merge: true }
      );
    }
  } catch (error) {
    console.error("Error al asignar rol:", error);
    throw error;
  }
}

/**
 * Revoca un rol a un usuario
 * @param userId ID del usuario
 * @param role Rol a revocar
 */
export async function revokeRole(
  userId: string,
  role: UserRole
): Promise<void> {
  try {
    const userRoles = await getUserRoles(userId);

    // No permitir revocar el rol de usuario básico si es el único
    if (
      role === "user" &&
      userRoles.roles.length === 1 &&
      userRoles.roles[0] === "user"
    ) {
      throw new Error("No se puede revocar el rol de usuario básico");
    }

    userRoles.roles = userRoles.roles.filter((r) => r !== role);
    await setDoc(
      doc(db, "users", userId),
      { roles: userRoles.roles },
      { merge: true }
    );
  } catch (error) {
    console.error("Error al revocar rol:", error);
    throw error;
  }
}
