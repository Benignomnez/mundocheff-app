const SPOONACULAR_API_KEY = "e6006fa093f84933aa4543772d1a4ba9";
const SPOONACULAR_BASE_URL = "https://api.spoonacular.com";

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: any[];
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: any[];
  summary: string;
}

export interface SearchRecipesResult {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface RecipeByIngredientsResult {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: any[];
  usedIngredients: any[];
  unusedIngredients: any[];
  likes: number;
}

/**
 * Busca recetas por consulta
 * @param query Consulta de búsqueda
 * @param diet Dieta específica (vegetarian, vegan, gluten-free, etc.)
 * @param cuisine Tipo de cocina (italian, mexican, etc.)
 * @param excludeIngredients Ingredientes a excluir
 * @param number Número de resultados a devolver
 * @returns Resultados de la búsqueda
 */
export async function searchRecipes(
  query: string,
  diet?: string,
  cuisine?: string,
  excludeIngredients?: string,
  number: number = 10
): Promise<SearchRecipesResult> {
  let url = `${SPOONACULAR_BASE_URL}/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${encodeURIComponent(
    query
  )}&number=${number}&addRecipeInformation=true`;

  if (diet) {
    url += `&diet=${encodeURIComponent(diet)}`;
  }

  if (cuisine) {
    url += `&cuisine=${encodeURIComponent(cuisine)}`;
  }

  if (excludeIngredients) {
    url += `&excludeIngredients=${encodeURIComponent(excludeIngredients)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al buscar recetas:", error);
    throw error;
  }
}

/**
 * Obtiene información detallada de una receta por su ID
 * @param id ID de la receta
 * @returns Información detallada de la receta
 */
export async function getRecipeById(id: number): Promise<Recipe> {
  const url = `${SPOONACULAR_BASE_URL}/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener la receta con ID ${id}:`, error);
    throw error;
  }
}

/**
 * Busca recetas por ingredientes
 * @param ingredients Lista de ingredientes separados por comas
 * @param number Número de resultados a devolver
 * @returns Lista de recetas que usan los ingredientes especificados
 */
export async function searchRecipesByIngredients(
  ingredients: string,
  number: number = 10
): Promise<RecipeByIngredientsResult[]> {
  const url = `${SPOONACULAR_BASE_URL}/recipes/findByIngredients?apiKey=${SPOONACULAR_API_KEY}&ingredients=${encodeURIComponent(
    ingredients
  )}&number=${number}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al buscar recetas por ingredientes:", error);
    throw error;
  }
}

/**
 * Genera un plan de comidas basado en las preferencias del usuario
 * @param timeFrame Período de tiempo (day o week)
 * @param targetCalories Calorías objetivo por día
 * @param diet Dieta específica
 * @param exclude Ingredientes a excluir
 * @returns Plan de comidas generado
 */
export async function generateMealPlan(
  timeFrame: "day" | "week" = "day",
  targetCalories?: number,
  diet?: string,
  exclude?: string
) {
  let url = `${SPOONACULAR_BASE_URL}/mealplanner/generate?apiKey=${SPOONACULAR_API_KEY}&timeFrame=${timeFrame}`;

  if (targetCalories) {
    url += `&targetCalories=${targetCalories}`;
  }

  if (diet) {
    url += `&diet=${encodeURIComponent(diet)}`;
  }

  if (exclude) {
    url += `&exclude=${encodeURIComponent(exclude)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al generar plan de comidas:", error);
    throw error;
  }
}

/**
 * Obtiene información nutricional de una receta
 * @param id ID de la receta
 * @returns Información nutricional
 */
export async function getRecipeNutrition(id: number) {
  const url = `${SPOONACULAR_BASE_URL}/recipes/${id}/nutritionWidget.json?apiKey=${SPOONACULAR_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error al obtener información nutricional para la receta ${id}:`,
      error
    );
    throw error;
  }
}

/**
 * Autocompleta ingredientes
 * @param query Consulta para autocompletar
 * @param number Número de resultados a devolver
 * @returns Lista de ingredientes sugeridos
 */
export async function autocompleteIngredient(
  query: string,
  number: number = 5
) {
  const url = `${SPOONACULAR_BASE_URL}/food/ingredients/autocomplete?apiKey=${SPOONACULAR_API_KEY}&query=${encodeURIComponent(
    query
  )}&number=${number}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al autocompletar ingredientes:", error);
    throw error;
  }
}
