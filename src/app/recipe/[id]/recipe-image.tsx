"use client";

import { useState, useEffect } from "react";

interface RecipeImageProps {
  imageUrl: string;
  recipeId: number;
  title: string;
}

export default function RecipeImage({
  imageUrl,
  recipeId,
  title,
}: RecipeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(imageUrl);
  const [loadError, setLoadError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  // Intentar diferentes formatos de URL para las imágenes
  const imageFormats = [
    // Formato directo de la API
    `https://spoonacular.com/recipeImages/${recipeId}-636x393.jpg`,
    `https://spoonacular.com/recipeImages/${recipeId}-556x370.jpg`,
    `https://spoonacular.com/recipeImages/${recipeId}-312x231.jpg`,
    `https://spoonacular.com/recipeImages/${recipeId}-240x150.jpg`,
    // Formato alternativo
    `https://webknox.com/recipeImages/${recipeId}-556x370.jpg`,
    // Imagen de respaldo
    "https://spoonacular.com/images/spoonacular-logo-b.svg",
  ];

  useEffect(() => {
    // Si la URL inicial no es una de nuestras URLs de prueba, intentar con ella primero
    if (
      !imageUrl.includes("spoonacular.com/recipeImages") &&
      !imageUrl.includes("webknox.com/recipeImages")
    ) {
      setCurrentSrc(imageUrl);
    } else {
      // Si ya es una URL de Spoonacular, empezar con nuestro primer formato
      setCurrentSrc(imageFormats[0]);
    }
  }, [imageUrl]);

  const handleImageError = () => {
    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);

    if (nextAttempt < imageFormats.length) {
      // Intentar con el siguiente formato
      setCurrentSrc(imageFormats[nextAttempt]);
    } else {
      // Si hemos agotado todos los formatos, mostrar el error
      setLoadError(true);
    }
  };

  return (
    <>
      {loadError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-4">
            <img
              src="https://spoonacular.com/images/spoonacular-logo-b.svg"
              alt="Spoonacular"
              className="w-32 h-32 mx-auto mb-2"
            />
            <p className="text-gray-500">No se pudo cargar la imagen</p>
          </div>
        </div>
      ) : (
        <>
          {/* Placeholder mientras carga */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <img
            src={currentSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            crossOrigin="anonymous"
            onError={handleImageError}
          />
        </>
      )}
    </>
  );
}
