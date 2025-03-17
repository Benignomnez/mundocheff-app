"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getUserPreferencesFromFirestore } from "@/lib/user-preferences";
import { UserPreferences, MealPlan } from "@/lib/meal-plan";
import { toast } from "sonner";

export function generateStaticParams() {
  return [{ id: "default" }]; // Properly typed for the route
}

export default function MealPlanPage() {
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Ejemplo de plan de comidas
  const mealPlan = {
    week: "June 10 - June 16, 2024",
    days: [
      {
        day: "Monday",
        meals: [
          {
            id: "1",
            type: "Breakfast",
            name: "Greek Yogurt with Berries",
            image:
              "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 320,
            prepTime: "5 min",
          },
          {
            id: "2",
            type: "Lunch",
            name: "Chicken Caesar Salad",
            image:
              "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 450,
            prepTime: "15 min",
          },
          {
            id: "3",
            type: "Dinner",
            name: "Baked Salmon with Vegetables",
            image:
              "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 520,
            prepTime: "25 min",
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            id: "4",
            type: "Breakfast",
            name: "Avocado Toast with Egg",
            image:
              "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 350,
            prepTime: "10 min",
          },
          {
            id: "5",
            type: "Lunch",
            name: "Quinoa Bowl with Roasted Vegetables",
            image:
              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 420,
            prepTime: "20 min",
          },
          {
            id: "6",
            type: "Dinner",
            name: "Grilled Chicken with Sweet Potato",
            image:
              "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 480,
            prepTime: "30 min",
          },
        ],
      },
    ],
  };

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

  return (
    <>
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
            <Button className="mt-4 md:mt-0" asChild>
              <Link href="/onboarding">Editar Preferencias</Link>
            </Button>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{mealPlan.week}</h2>
            <div className="space-y-8">
              {mealPlan.days.map((day) => (
                <div key={day.day}>
                  <h3 className="text-lg font-medium mb-4">{day.day}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.meals.map((meal) => (
                      <Card key={meal.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                            {meal.type}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{meal.name}</h4>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{meal.calories} cal</span>
                            <span>{meal.prepTime}</span>
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
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/browse">Explorar Más Recetas</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
