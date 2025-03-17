import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function RecipeOfDay() {
  // Sample data for Recipe of the Day
  const recipeOfDay = {
    id: "123",
    title: "Mediterranean Grilled Chicken Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description:
      "A refreshing salad with grilled chicken, mixed greens, cherry tomatoes, cucumber, red onion, feta cheese, and a lemon-herb vinaigrette.",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 4,
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl font-bold mb-8">Recipe of the Day</h2>
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-full w-full">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                {/* Placeholder when image is loading or failed to load */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
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
              {/* Use standard img tag to avoid hydration issues */}
              <img
                src={recipeOfDay.image}
                alt={recipeOfDay.title}
                className="absolute inset-0 w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <CardContent className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">{recipeOfDay.title}</h3>
                <p className="text-gray-600 mb-6">{recipeOfDay.description}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Prep Time</p>
                    <p className="font-medium">{recipeOfDay.prepTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cook Time</p>
                    <p className="font-medium">{recipeOfDay.cookTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Servings</p>
                    <p className="font-medium">{recipeOfDay.servings}</p>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link href={`/recipe/${recipeOfDay.id}`}>View Recipe</Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
