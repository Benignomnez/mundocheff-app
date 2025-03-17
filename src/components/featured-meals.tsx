import { RecipeCard } from "@/components/recipe-card";

export function FeaturedMeals() {
  // Sample data for featured meals
  const featuredMeals = [
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
  ];

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl font-bold mb-8">Featured Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMeals.map((meal) => (
            <RecipeCard
              key={meal.id}
              id={meal.id}
              title={meal.title}
              image={meal.image}
              tags={meal.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
