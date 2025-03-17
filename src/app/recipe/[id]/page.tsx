import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  // Generate params for all possible recipe IDs
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "123" }, // For the Recipe of the Day
  ];
}

export default function RecipePage({ params }: { params: { id: string } }) {
  // Sample recipe data - In a real app, we would fetch this data based on the ID
  const recipe = {
    id: params.id,
    title: "Mediterranean Grilled Chicken Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description:
      "A refreshing salad with grilled chicken, mixed greens, cherry tomatoes, cucumber, red onion, feta cheese, and a lemon-herb vinaigrette.",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 4,
    ingredients: [
      "2 boneless, skinless chicken breasts",
      "1 tablespoon olive oil",
      "1 teaspoon dried oregano",
      "Salt and pepper to taste",
      "6 cups mixed salad greens",
      "1 cup cherry tomatoes, halved",
      "1 cucumber, diced",
      "1/2 red onion, thinly sliced",
      "1/2 cup feta cheese, crumbled",
      "1/4 cup Kalamata olives, pitted",
    ],
    instructions: [
      "Season the chicken with olive oil, oregano, salt, and pepper.",
      "Grill the chicken for 6-7 minutes per side, or until cooked through.",
      "Let the chicken rest for 5 minutes, then slice into strips.",
      "In a large bowl, combine the salad greens, tomatoes, cucumber, red onion, feta cheese, and olives.",
      "Arrange the grilled chicken on top of the salad.",
      "Drizzle with lemon-herb vinaigrette and serve immediately.",
    ],
    nutrition: {
      calories: 320,
      protein: "28g",
      carbs: "12g",
      fat: "18g",
      fiber: "5g",
    },
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-gray-600 mb-6">{recipe.description}</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="text-sm text-gray-500">Prep Time</p>
                <p className="font-medium">{recipe.prepTime}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="text-sm text-gray-500">Cook Time</p>
                <p className="font-medium">{recipe.cookTime}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="text-sm text-gray-500">Servings</p>
                <p className="font-medium">{recipe.servings}</p>
              </div>
            </div>
          </div>

          <div className="relative h-80 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            {/* Use standard img tag to avoid hydration issues */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Nutrition</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Calories</p>
                    <p className="font-medium">{recipe.nutrition.calories}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="font-medium">{recipe.nutrition.protein}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-medium">{recipe.nutrition.carbs}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fat</p>
                    <p className="font-medium">{recipe.nutrition.fat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fiber</p>
                    <p className="font-medium">{recipe.nutrition.fiber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex space-x-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Save Recipe</Button>
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              Print Recipe
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
