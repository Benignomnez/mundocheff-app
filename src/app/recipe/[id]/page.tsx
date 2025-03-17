import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { getRecipeById, getRecipeNutrition, Recipe } from "@/lib/spoonacular";
import Image from "next/image";
import RecipeActions from "./recipe-actions";
import RecipeImage from "./recipe-image";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  // Obtener datos de forma asíncrona
  // Corregir el error de Next.js usando await para params
  const resolvedParams = await params;
  const recipeId = parseInt(resolvedParams.id);
  let recipe: Recipe | null = null;
  let nutrition: any | null = null;
  let error: string | null = null;

  try {
    // Obtener detalles de la receta
    recipe = await getRecipeById(recipeId);

    // Obtener información nutricional
    nutrition = await getRecipeNutrition(recipeId);
  } catch (err) {
    console.error("Error al cargar los detalles de la receta:", err);
    error =
      "No se pudo cargar la receta. Por favor, inténtalo de nuevo más tarde.";
  }

  // Función para limpiar el HTML de la descripción (ahora en el cliente)
  const cleanHtml = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };

  // Asegurarse de que la URL de la imagen tenga el dominio completo
  // Formato de Spoonacular: https://spoonacular.com/recipeImages/[recipe-id]-[size].jpg
  const getImageUrl = () => {
    if (!recipe?.image) return "";

    // Si ya es una URL completa, usarla
    if (recipe.image.startsWith("http")) return recipe.image;

    // Si es solo un nombre de archivo, construir la URL completa
    if (
      recipe.image.includes(".jpg") ||
      recipe.image.includes(".png") ||
      recipe.image.includes(".jpeg")
    ) {
      return `https://spoonacular.com/recipeImages/${recipe.image}`;
    }

    // Si es solo un ID, construir la URL con el tamaño 636x393 (más grande para la página de detalle)
    return `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`;
  };

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

  const imageUrl = getImageUrl();

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
            {/* Usar componente cliente para manejar errores de carga de imagen */}
            <RecipeImage
              imageUrl={imageUrl}
              recipeId={recipe.id}
              title={recipe.title}
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
            <RecipeActions recipeId={recipe.id} recipeTitle={recipe.title} />
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
