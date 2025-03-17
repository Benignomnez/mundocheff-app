import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/">Return Home</Link>
        </Button>
      </main>
      <Footer />
    </>
  );
}
