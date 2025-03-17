"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getRecipeById, getRecipeNutrition, Recipe } from "@/lib/spoonacular";
import { toast } from "sonner";

export default function RecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [nutrition, setNutrition] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Obtener detalles de la receta
        const recipeData = await getRecipeById(parseInt(params.id));
        setRecipe(recipeData);

        // Obtener información nutricional
        const nutritionData = await getRecipeNutrition(parseInt(params.id));
        setNutrition(nutritionData);
      } catch (err) {
        console.error("Error al cargar los detalles de la receta:", err);
        setError(
          "No se pudo cargar la receta. Por favor, inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [params.id]);

  // Función para limpiar el HTML de la descripción
  const cleanHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Función para guardar la receta (simulada)
  const handleSaveRecipe = () => {
    toast.success("Receta guardada en favoritos");
  };

  // Función para imprimir la receta
  const handlePrintRecipe = () => {
    window.print();
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-12">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !recipe) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Error</h1>
            <p className="text-gray-600 mb-6">
              {error || "No se pudo cargar la receta."}
            </p>
            <Button onClick={() => window.history.back()}>Volver</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Asegurarse de que la URL de la imagen tenga el dominio completo
  const imageUrl =
    recipe.image && !recipe.image.startsWith("http")
      ? `https://spoonacular.com/recipeImages/${recipe.image}`
      : recipe.image;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {recipe.title}
            </h1>
            {recipe.summary && (
              <div
                className="text-gray-600 mb-6"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            )}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="text-sm text-gray-500">Tiempo de Preparación</p>
                <p className="font-medium">{recipe.readyInMinutes} min</p>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="text-sm text-gray-500">Porciones</p>
                <p className="font-medium">{recipe.servings}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="text-sm text-gray-500">Puntuación</p>
                <p className="font-medium">{recipe.healthScore}/100</p>
              </div>
            </div>
          </div>

          <div className="relative h-80 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={recipe.title}
              className="absolute inset-0 w-full h-full object-cover"
              crossOrigin="anonymous"
              onError={(e) => {
                // Si la imagen falla, intentar con una URL alternativa
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("spoonacular.com/recipeImages/")) {
                  target.src = `https://spoonacular.com/recipeImages/${recipe.image}`;
                } else if (
                  target.src.includes("recipeImages") &&
                  !target.src.includes("-556x370")
                ) {
                  // Intentar con un tamaño específico si aún falla
                  target.src = `https://spoonacular.com/recipeImages/${recipe.image}-556x370.jpg`;
                }
              }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Ingredientes</h2>
              <ul className="space-y-2">
                {recipe.extendedIngredients &&
                  recipe.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-emerald-600 mr-2">•</span>
                      <span>{ingredient.original}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Información Nutricional
              </h2>
              {nutrition ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Calorías</p>
                      <p className="font-medium">{nutrition.calories}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Proteínas</p>
                      <p className="font-medium">{nutrition.protein}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Carbohidratos</p>
                      <p className="font-medium">{nutrition.carbs}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Grasas</p>
                      <p className="font-medium">{nutrition.fat}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  Información nutricional no disponible
                </p>
              )}

              {/* Dietas y características */}
              <h3 className="text-xl font-bold mt-6 mb-3">Características</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.vegetarian && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Vegetariano
                  </span>
                )}
                {recipe.vegan && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Vegano
                  </span>
                )}
                {recipe.glutenFree && (
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    Sin Gluten
                  </span>
                )}
                {recipe.dairyFree && (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    Sin Lácteos
                  </span>
                )}
                {recipe.veryHealthy && (
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    Muy Saludable
                  </span>
                )}
                {recipe.cheap && (
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                    Económico
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Instrucciones</h2>
            {recipe.analyzedInstructions &&
            recipe.analyzedInstructions.length > 0 ? (
              <ol className="space-y-4">
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number} className="flex">
                    <span className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      {step.number}
                    </span>
                    <p>{step.step}</p>
                  </li>
                ))}
              </ol>
            ) : recipe.instructions ? (
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            ) : (
              <p className="text-gray-600">
                No hay instrucciones disponibles para esta receta.
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSaveRecipe}
            >
              Guardar Receta
            </Button>
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              onClick={handlePrintRecipe}
            >
              Imprimir Receta
            </Button>
          </div>

          {/* Fuente de la receta */}
          {recipe.sourceName && (
            <div className="mt-8 text-sm text-gray-500">
              Fuente:{" "}
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                {recipe.sourceName}
              </a>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
