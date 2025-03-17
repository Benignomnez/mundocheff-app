import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RecipeCard } from "@/components/recipe-card";

export function generateStaticParams() {
  return [{ id: 'default' }]; // Properly typed for the route
}

export default function BrowsePage() {
  // Sample data for recipes
  const recipes = [
    {
      id: "1",
      title: "Vegetable Soup",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Vegetarian", "Soup"],
    },
    {
      id: "2",
      title: "Chicken Sandwich",
      image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Chicken", "Sandwich"],
    },
    {
      id: "3",
      title: "Pasta",
      image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Italian", "Pasta"],
    },
    {
      id: "4",
      title: "Greek Yogurt",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Breakfast", "Greek"],
    },
    {
      id: "5",
      title: "Avocado Toast",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Breakfast", "Vegetarian"],
    },
    {
      id: "6",
      title: "Beef Stir Fry",
      image: "https://images.unsplash.com/photo-1512058556646-c4da40fba323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Beef", "Asian"],
    },
    {
      id: "7",
      title: "Berry Smoothie",
      image: "https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Drink", "Breakfast"],
    },
    {
      id: "8",
      title: "Salmon Fillet",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Seafood", "Dinner"],
    },
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Browse Recipes</h1>
        <p className="text-gray-600 mb-8">Explore our collection of delicious recipes</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              tags={recipe.tags}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
