"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  saveUserPreferencesToFirestore,
  getUserPreferencesFromFirestore,
} from "@/lib/user-preferences";
import {
  UserPreferences,
  DietaryPreference,
  CuisinePreference,
  CalorieRange,
} from "@/lib/meal-plan";
import { toast } from "sonner";

export default function OnboardingPage() {
  const [dietary, setDietary] = useState<DietaryPreference[]>([]);
  const [cuisines, setCuisines] = useState<CuisinePreference[]>([]);
  const [calorieRange, setCalorieRange] = useState<CalorieRange>("medium");
  const [loading, setLoading] = useState(false);
  const [loadingPreferences, setLoadingPreferences] = useState(true);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const loadUserPreferences = async () => {
      if (user) {
        try {
          const preferences = await getUserPreferencesFromFirestore(user.uid);
          if (preferences) {
            setDietary(preferences.dietary);
            setCuisines(preferences.cuisines);
            setCalorieRange(preferences.calorieRange);
          }
        } catch (error) {
          console.error("Error al cargar preferencias:", error);
        }
      }
      setLoadingPreferences(false);
    };

    loadUserPreferences();
  }, [user]);

  const handleDietaryChange = (diet: DietaryPreference, checked: boolean) => {
    if (checked) {
      setDietary([...dietary, diet]);
    } else {
      setDietary(dietary.filter((d) => d !== diet));
    }
  };

  const handleCuisineChange = (
    cuisine: CuisinePreference,
    checked: boolean
  ) => {
    if (checked) {
      setCuisines([...cuisines, cuisine]);
    } else {
      setCuisines(cuisines.filter((c) => c !== cuisine));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const preferences: UserPreferences = {
      dietary,
      cuisines,
      calorieRange,
    };

    try {
      if (user) {
        // Guardar en Firebase si el usuario está autenticado
        await saveUserPreferencesToFirestore(user.uid, preferences);
        toast.success("Preferencias guardadas correctamente");
      } else {
        // Guardar en localStorage si no está autenticado
        localStorage.setItem("userPreferences", JSON.stringify(preferences));
        toast.success("Preferencias guardadas localmente");
      }

      router.push("/meal-plan");
    } catch (error) {
      console.error("Error al guardar preferencias:", error);
      toast.error("Error al guardar preferencias");
    } finally {
      setLoading(false);
    }
  };

  if (loadingPreferences) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-md mx-auto text-center">
            <p>Cargando preferencias...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Bienvenido a MundoChef
          </h1>
          <p className="text-muted-foreground mb-8 text-center">
            Cuéntanos tus preferencias alimenticias para personalizar tu
            experiencia.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                Restricciones Dietéticas
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Vegetariano",
                    value: "vegetarian" as DietaryPreference,
                  },
                  { label: "Vegano", value: "vegan" as DietaryPreference },
                  {
                    label: "Sin Gluten",
                    value: "gluten-free" as DietaryPreference,
                  },
                  {
                    label: "Sin Lácteos",
                    value: "dairy-free" as DietaryPreference,
                  },
                  { label: "Keto", value: "keto" as DietaryPreference },
                  { label: "Paleo", value: "paleo" as DietaryPreference },
                ].map((diet) => (
                  <label
                    key={diet.value}
                    className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted"
                  >
                    <Checkbox
                      checked={dietary.includes(diet.value)}
                      onCheckedChange={(checked) =>
                        handleDietaryChange(diet.value, checked as boolean)
                      }
                    />
                    <span>{diet.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Preferencias Culinarias</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Italiana", value: "italian" as CuisinePreference },
                  { label: "Mexicana", value: "mexican" as CuisinePreference },
                  { label: "Asiática", value: "asian" as CuisinePreference },
                  {
                    label: "Mediterránea",
                    value: "mediterranean" as CuisinePreference,
                  },
                  { label: "India", value: "indian" as CuisinePreference },
                  {
                    label: "Medio Oriente",
                    value: "middle-eastern" as CuisinePreference,
                  },
                ].map((cuisine) => (
                  <label
                    key={cuisine.value}
                    className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted"
                  >
                    <Checkbox
                      checked={cuisines.includes(cuisine.value)}
                      onCheckedChange={(checked) =>
                        handleCuisineChange(cuisine.value, checked as boolean)
                      }
                    />
                    <span>{cuisine.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Rango de Calorías</h2>
              <RadioGroup
                value={calorieRange}
                onValueChange={(value) =>
                  setCalorieRange(value as CalorieRange)
                }
              >
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="low" id="low" />
                    <span>Bajo en Calorías (menos de 500 por comida)</span>
                  </label>
                  <label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="medium" id="medium" />
                    <span>Calorías Medias (500-800 por comida)</span>
                  </label>
                  <label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="high" id="high" />
                    <span>Alto en Calorías (más de 800 por comida)</span>
                  </label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Guardando..." : "Guardar y Generar Plan de Comidas"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Omitir por ahora
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
