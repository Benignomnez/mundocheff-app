"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getUserPreferencesFromFirestore } from "@/lib/user-preferences";
import { UserPreferences } from "@/lib/meal-plan";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { generateMealPlan } from "@/lib/spoonacular";

// Esta función es necesaria para la exportación estática
export const dynamic = "force-static";

interface SpoonacularMeal {
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  nutrition?: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
}

interface SpoonacularDay {
  meals: SpoonacularMeal[];
  nutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
}

interface SpoonacularMealPlan {
  meals?: SpoonacularMeal[];
  nutrients?: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
  week?: {
    monday: SpoonacularDay;
    tuesday: SpoonacularDay;
    wednesday: SpoonacularDay;
    thursday: SpoonacularDay;
    friday: SpoonacularDay;
    saturday: SpoonacularDay;
    sunday: SpoonacularDay;
  };
}

export default function MealPlanPage() {
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(null);
  const [mealPlan, setMealPlan] = useState<SpoonacularMealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const { user } = useAuth();

  // Cargar preferencias del usuario
  useEffect(() => {
    const loadUserPreferences = async () => {
      try {
        let preferences: UserPreferences | null = null;

        if (user) {
          // Cargar desde Firebase si el usuario está autenticado
          preferences = await getUserPreferencesFromFirestore(user.uid);
        } else {
          // Cargar desde localStorage si no está autenticado
          const savedPreferences = localStorage.getItem("userPreferences");
          if (savedPreferences) {
            preferences = JSON.parse(savedPreferences);
          }
        }

        setUserPreferences(preferences);
      } catch (error) {
        console.error("Error al cargar preferencias:", error);
        toast.error("Error al cargar tus preferencias");
      } finally {
        setLoading(false);
      }
    };

    loadUserPreferences();
  }, [user]);

  // Generar plan de comidas cuando se cargan las preferencias
  useEffect(() => {
    const generatePlan = async () => {
      if (!userPreferences) return;

      setGeneratingPlan(true);
      try {
        // Convertir preferencias a formato de Spoonacular
        let diet: string | undefined;
        if (userPreferences.dietary.includes("vegetarian")) {
          diet = "vegetarian";
        } else if (userPreferences.dietary.includes("vegan")) {
          diet = "vegan";
        } else if (userPreferences.dietary.includes("gluten-free")) {
          diet = "gluten-free";
        }

        // Convertir rango de calorías
        let targetCalories: number | undefined;
        switch (userPreferences.calorieRange) {
          case "low":
            targetCalories = 1500;
            break;
          case "medium":
            targetCalories = 2000;
            break;
          case "high":
            targetCalories = 2500;
            break;
        }

        // Excluir ingredientes basados en preferencias
        let exclude: string | undefined;
        if (userPreferences.dietary.includes("dairy-free")) {
          exclude = "dairy";
        }

        // Generar plan de comidas
        const plan = await generateMealPlan(
          "week",
          targetCalories,
          diet,
          exclude
        );

        setMealPlan(plan);
      } catch (error) {
        console.error("Error al generar plan de comidas:", error);
        toast.error("Error al generar tu plan de comidas");
      } finally {
        setGeneratingPlan(false);
      }
    };

    if (userPreferences && !mealPlan) {
      generatePlan();
    }
  }, [userPreferences, mealPlan]);

  // Función para obtener calorías de una comida
  const getMealCalories = (meal: SpoonacularMeal): number => {
    if (meal.nutrition && meal.nutrition.nutrients) {
      const calorieInfo = meal.nutrition.nutrients.find(
        (n) => n.name === "Calories"
      );
      if (calorieInfo) {
        return Math.round(calorieInfo.amount);
      }
    }
    return 0;
  };

  // Función para regenerar el plan de comidas
  const handleRegeneratePlan = () => {
    setMealPlan(null);
  };

  return (
    <ProtectedRoute>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Tu Plan de Comidas Semanal
              </h1>
              {userPreferences && (
                <p className="text-muted-foreground">
                  Personalizado para tus preferencias:
                  {userPreferences.dietary.length > 0 && (
                    <span className="font-medium">
                      {" "}
                      {userPreferences.dietary.join(", ")}
                    </span>
                  )}
                  {userPreferences.cuisines.length > 0 && (
                    <span className="font-medium">
                      {" "}
                      • {userPreferences.cuisines.join(", ")}
                    </span>
                  )}
                  <span className="font-medium">
                    {" "}
                    • {userPreferences.calorieRange} calorías
                  </span>
                </p>
              )}
              {!userPreferences && !loading && (
                <p className="text-muted-foreground">
                  <Link
                    href="/onboarding"
                    className="text-primary hover:underline"
                  >
                    Configura tus preferencias
                  </Link>{" "}
                  para un plan personalizado.
                </p>
              )}
              {loading && (
                <p className="text-muted-foreground">
                  Cargando tus preferencias...
                </p>
              )}
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button
                onClick={handleRegeneratePlan}
                disabled={generatingPlan || !userPreferences}
              >
                Regenerar Plan
              </Button>
              <Button variant="outline" asChild>
                <Link href="/onboarding">Editar Preferencias</Link>
              </Button>
            </div>
          </div>

          {/* Mostrar cargando */}
          {(loading || generatingPlan) && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
          )}

          {/* Mostrar plan de comidas */}
          {!loading && !generatingPlan && mealPlan && mealPlan.week && (
            <div className="space-y-8">
              {Object.entries(mealPlan.week).map(([day, dayPlan]) => (
                <div key={day}>
                  <h3 className="text-lg font-medium mb-4 capitalize">{day}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dayPlan.meals.map((meal, index) => (
                      <Card
                        key={`${meal.id}-${index}`}
                        className="overflow-hidden"
                      >
                        <div className="aspect-video relative">
                          <img
                            src={meal.image}
                            alt={meal.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                            {index === 0
                              ? "Desayuno"
                              : index === 1
                              ? "Almuerzo"
                              : "Cena"}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{meal.title}</h4>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{getMealCalories(meal)} cal</span>
                            <span>{meal.readyInMinutes} min</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-3"
                            asChild
                          >
                            <Link href={`/recipe/${meal.id}`}>Ver Receta</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">
                      Resumen nutricional del día:
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <span>
                        Calorías: {Math.round(dayPlan.nutrients.calories)}
                      </span>
                      <span>
                        Proteínas: {Math.round(dayPlan.nutrients.protein)}g
                      </span>
                      <span>Grasas: {Math.round(dayPlan.nutrients.fat)}g</span>
                      <span>
                        Carbohidratos:{" "}
                        {Math.round(dayPlan.nutrients.carbohydrates)}g
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mostrar mensaje si no hay preferencias */}
          {!loading && !generatingPlan && !userPreferences && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                Configura tus preferencias
              </h2>
              <p className="text-gray-600 mb-6">
                Para generar un plan de comidas personalizado, necesitamos
                conocer tus preferencias alimenticias.
              </p>
              <Button asChild>
                <Link href="/onboarding">Configurar Preferencias</Link>
              </Button>
            </div>
          )}

          {/* Mostrar mensaje si hay un error */}
          {!loading && !generatingPlan && userPreferences && !mealPlan && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                No se pudo generar el plan de comidas
              </h2>
              <p className="text-gray-600 mb-6">
                Hubo un problema al generar tu plan de comidas. Por favor,
                inténtalo de nuevo.
              </p>
              <Button onClick={handleRegeneratePlan}>Intentar de nuevo</Button>
            </div>
          )}

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/browse">Explorar Más Recetas</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
}
