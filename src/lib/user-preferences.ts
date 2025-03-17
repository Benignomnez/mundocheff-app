import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserPreferences } from "./meal-plan";

/**
 * Guarda las preferencias del usuario en Firestore
 */
export async function saveUserPreferencesToFirestore(
  userId: string,
  preferences: UserPreferences
): Promise<void> {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Actualizar documento existente
      await updateDoc(userDocRef, { preferences });
    } else {
      // Crear nuevo documento
      await setDoc(userDocRef, {
        preferences,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error al guardar preferencias:", error);
    throw error;
  }
}

/**
 * Obtiene las preferencias del usuario desde Firestore
 */
export async function getUserPreferencesFromFirestore(
  userId: string
): Promise<UserPreferences | null> {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists() && userDoc.data().preferences) {
      return userDoc.data().preferences as UserPreferences;
    }

    return null;
  } catch (error) {
    console.error("Error al obtener preferencias:", error);
    throw error;
  }
}
