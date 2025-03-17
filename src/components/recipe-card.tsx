import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import RecipeCardImage from "./recipe-card-image";

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
  // Formato de Spoonacular: https://spoonacular.com/recipeImages/[recipe-id]-[size].jpg
  const getImageUrl = () => {
    if (!image) return "";

    // Si ya es una URL completa, usarla
    if (image.startsWith("http")) return image;

    // Si es solo un nombre de archivo, construir la URL completa
    if (
      image.includes(".jpg") ||
      image.includes(".png") ||
      image.includes(".jpeg")
    ) {
      return `https://spoonacular.com/recipeImages/${image}`;
    }

    // Si es solo un ID, construir la URL con el tamaño 556x370
    return `https://spoonacular.com/recipeImages/${id}-556x370.jpg`;
  };

  const imageUrl = getImageUrl();

  return (
    <Card className="overflow-hidden group">
      <Link href={`/recipe/${id}`}>
        <div className="relative h-48 w-full">
          <RecipeCardImage imageUrl={imageUrl} recipeId={id} title={title} />
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
