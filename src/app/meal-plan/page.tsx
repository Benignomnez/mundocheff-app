import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function generateStaticParams() {
  return [{ id: 'default' }]; // Properly typed for the route
}

export default function MealPlanPage() {
  // Example data for the meal plan
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
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 320,
            prepTime: "5 min",
          },
          {
            id: "2",
            type: "Lunch",
            name: "Chicken Caesar Salad",
            image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 450,
            prepTime: "15 min",
          },
          {
            id: "3",
            type: "Dinner",
            name: "Baked Salmon with Vegetables",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 350,
            prepTime: "10 min",
          },
          {
            id: "5",
            type: "Lunch",
            name: "Vegetable Soup with Bread",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 380,
            prepTime: "20 min",
          },
          {
            id: "6",
            type: "Dinner",
            name: "Turkey Meatballs with Pasta",
            image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 580,
            prepTime: "30 min",
          },
        ],
      },
      {
        day: "Wednesday",
        meals: [
          {
            id: "7",
            type: "Breakfast",
            name: "Berry Smoothie Bowl",
            image: "https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 290,
            prepTime: "10 min",
          },
          {
            id: "8",
            type: "Lunch",
            name: "Mediterranean Wrap",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 420,
            prepTime: "15 min",
          },
          {
            id: "9",
            type: "Dinner",
            name: "Grilled Chicken with Quinoa",
            image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            calories: 550,
            prepTime: "25 min",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Weekly Meal Plan</h1>
              <p className="text-gray-600 mb-2">{mealPlan.week}</p>
              <p className="text-sm text-gray-500">Based on your dietary preferences</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Print Meal Plan
              </Button>
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                <Link href="/onboarding">Adjust Preferences</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {mealPlan.days.map((day) => (
              <div key={day.day} className="rounded-lg border overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h2 className="text-xl font-semibold">{day.day}</h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.meals.map((meal) => (
                      <Card key={meal.id} className="overflow-hidden">
                        <div className="relative h-48 w-full">
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            crossOrigin="anonymous"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-emerald-600 mb-1">
                            {meal.type}
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{meal.name}</h3>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>{meal.calories} calories</span>
                            <span>{meal.prepTime}</span>
                          </div>
                          <Button asChild className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700">
                            <Link href={`/recipe/${meal.id}`}>View Recipe</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Generate New Plan
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
