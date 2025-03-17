import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function generateStaticParams() {
  return [{ id: 'default' }]; // Properly typed for the route
}

export default function OnboardingPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome to MundoChef</h1>
          <p className="text-gray-600 mb-8 text-center">
            Let us know your dietary preferences so we can personalize your experience.
          </p>

          <form action="/meal-plan" className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Dietary Restrictions</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo"].map((diet) => (
                  <label key={diet} className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" name="dietary" value={diet.toLowerCase()} className="h-4 w-4 text-emerald-600" />
                    <span>{diet}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Food Preferences</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Italian", "Mexican", "Asian", "Mediterranean", "Indian", "Middle Eastern"].map((cuisine) => (
                  <label key={cuisine} className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" name="cuisine" value={cuisine.toLowerCase()} className="h-4 w-4 text-emerald-600" />
                    <span>{cuisine}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Calorie Range</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="calories" value="low" className="h-4 w-4 text-emerald-600" />
                  <span>Low Calorie (under 500 per meal)</span>
                </label>
                <label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="calories" value="medium" className="h-4 w-4 text-emerald-600" defaultChecked />
                  <span>Medium Calorie (500-800 per meal)</span>
                </label>
                <label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="calories" value="high" className="h-4 w-4 text-emerald-600" />
                  <span>High Calorie (800+ per meal)</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Generate My Meal Plan
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-emerald-600">
              Skip for now
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
