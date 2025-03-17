import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Discover & Cook <span className="text-emerald-600">Delicious Recipes</span>
          </h1>
          <p className="max-w-[700px] text-gray-600 md:text-xl">
            Find recipes, create meal plans, and cook amazing food with our easy-to-follow recipes
            and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/onboarding">Create Personalized Meal Plan</Link>
            </Button>
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              <Link href="/browse">Browse Meals</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
