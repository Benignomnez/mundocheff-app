import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedMeals } from "@/components/featured-meals";
import { RecipeOfDay } from "@/components/recipe-of-day";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedMeals />
      <RecipeOfDay />
      <Footer />
    </>
  );
}
