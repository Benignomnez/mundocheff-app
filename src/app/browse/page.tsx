"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RecipeCard } from "@/components/recipe-card";
import { useState, useEffect, Suspense } from "react";
import { searchRecipes, Recipe } from "@/lib/spoonacular";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";

function BrowseContent() {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiet, setSelectedDiet] = useState<string>("any");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("any");
  const [excludeIngredients, setExcludeIngredients] = useState<string>("");

  // Opciones para los filtros
  const dietOptions = [
    { value: "any", label: "Cualquier dieta" },
    { value: "vegetarian", label: "Vegetariana" },
    { value: "vegan", label: "Vegana" },
    { value: "gluten-free", label: "Sin gluten" },
    { value: "ketogenic", label: "Keto" },
    { value: "paleo", label: "Paleo" },
  ];

  const cuisineOptions = [
    { value: "any", label: "Cualquier cocina" },
    { value: "italian", label: "Italiana" },
    { value: "mexican", label: "Mexicana" },
    { value: "spanish", label: "Española" },
    { value: "mediterranean", label: "Mediterránea" },
    { value: "asian", label: "Asiática" },
    { value: "american", label: "Americana" },
    { value: "french", label: "Francesa" },
    { value: "indian", label: "India" },
  ];

  // Procesar parámetros de URL al cargar
  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
      performSearch(search, selectedDiet, selectedCuisine, excludeIngredients);
    } else {
      // Cargar recetas populares si no hay búsqueda
      fetchPopularRecipes();
    }
  }, [searchParams]);

  // Cargar recetas populares
  const fetchPopularRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchRecipes(
        "",
        undefined,
        undefined,
        undefined,
        12
      );
      setRecipes(result.results);
    } catch (err) {
      console.error("Error al cargar recetas populares:", err);
      setError(
        "No se pudieron cargar las recetas. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  // Función para realizar búsqueda
  const performSearch = async (
    query: string,
    diet?: string,
    cuisine?: string,
    exclude?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await searchRecipes(
        query,
        diet !== "any" ? diet : undefined,
        cuisine !== "any" ? cuisine : undefined,
        exclude || undefined,
        12
      );
      setRecipes(result.results);
    } catch (err) {
      console.error("Error al buscar recetas:", err);
      setError(
        "No se pudieron cargar las recetas. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  // Manejar la búsqueda desde el formulario
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(
      searchQuery,
      selectedDiet,
      selectedCuisine,
      excludeIngredients
    );
  };

  // Extraer etiquetas de la receta
  const getRecipeTags = (recipe: Recipe): string[] => {
    const tags: string[] = [];

    // Añadir dietas
    if (recipe.vegetarian) tags.push("Vegetariano");
    if (recipe.vegan) tags.push("Vegano");
    if (recipe.glutenFree) tags.push("Sin Gluten");
    if (recipe.dairyFree) tags.push("Sin Lácteos");

    // Añadir tipo de plato
    if (recipe.dishTypes && recipe.dishTypes.length > 0) {
      tags.push(recipe.dishTypes[0]);
    }

    // Añadir cocina
    if (recipe.cuisines && recipe.cuisines.length > 0) {
      tags.push(recipe.cuisines[0]);
    }

    return tags;
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Explorar Recetas</h1>
      <p className="text-gray-600 mb-8">
        Descubre deliciosas recetas para cualquier ocasión
      </p>

      {/* Formulario de búsqueda */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search-query">Buscar recetas</Label>
              <Input
                id="search-query"
                type="text"
                placeholder="Pasta, ensalada, pollo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="diet">Dieta</Label>
              <Select value={selectedDiet} onValueChange={setSelectedDiet}>
                <SelectTrigger id="diet">
                  <SelectValue placeholder="Cualquier dieta" />
                </SelectTrigger>
                <SelectContent>
                  {dietOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cuisine">Cocina</Label>
              <Select
                value={selectedCuisine}
                onValueChange={setSelectedCuisine}
              >
                <SelectTrigger id="cuisine">
                  <SelectValue placeholder="Cualquier cocina" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="exclude">Excluir ingredientes</Label>
            <Input
              id="exclude"
              type="text"
              placeholder="Ingredientes separados por coma"
              value={excludeIngredients}
              onChange={(e) => setExcludeIngredients(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Ejemplo: cebolla, ajo, lactosa
            </p>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Buscando..." : "Buscar Recetas"}
            </Button>
          </div>
        </form>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Resultados */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        <>
          {recipes.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">
                No se encontraron recetas
              </h2>
              <p className="text-gray-600">
                Intenta con diferentes términos de búsqueda o filtros.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  tags={getRecipeTags(recipe)}
                  readyInMinutes={recipe.readyInMinutes}
                  servings={recipe.servings}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
          </div>
        }
      >
        <BrowseContent />
      </Suspense>
      <Footer />
    </>
  );
}
