"use client";

import { useEffect } from "react";
import { initializeAnalytics } from "@/lib/firebase";

export function FirebaseAnalytics() {
  useEffect(() => {
    // Inicializar Firebase Analytics
    const analytics = initializeAnalytics();

    // No necesitamos devolver una función de limpieza
    // ya que Analytics se maneja automáticamente
  }, []);

  // Este componente no renderiza nada visible
  return null;
}
