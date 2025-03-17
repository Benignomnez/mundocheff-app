import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface RecipeCardProps {
  id: number | string;
  title: string;
  image: string;
  tags?: string[];
  readyInMinutes?: number;
  servings?: number;
}

export function RecipeCard({
  id,
  title,
  image,
  tags = [],
  readyInMinutes,
  servings,
}: RecipeCardProps) {
  // Asegurarse de que la URL de la imagen tenga el dominio completo
  const imageUrl =
    image && !image.startsWith("http")
      ? `https://spoonacular.com/recipeImages/${image}`
      : image;

  return (
    <Card className="overflow-hidden group">
      <Link href={`/recipe/${id}`}>
        <div className="relative h-48 w-full">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            {/* Placeholder when image is loading or failed to load */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
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
          {/* Usar img con onError para manejar errores de carga */}
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
            crossOrigin="anonymous"
            onError={(e) => {
              // Si la imagen falla, intentar con una URL alternativa
              const target = e.target as HTMLImageElement;
              if (!target.src.includes("spoonacular.com/recipeImages/")) {
                target.src = `https://spoonacular.com/recipeImages/${image}`;
              } else if (
                target.src.includes("recipeImages") &&
                !target.src.includes("-556x370")
              ) {
                // Intentar con un tamaño específico si aún falla
                target.src = `https://spoonacular.com/recipeImages/${image}-556x370.jpg`;
              }
            }}
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>

        {/* Información adicional de Spoonacular */}
        {(readyInMinutes || servings) && (
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            {readyInMinutes && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{readyInMinutes} min</span>
              </div>
            )}

            {servings && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>{servings} porciones</span>
              </div>
            )}
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
