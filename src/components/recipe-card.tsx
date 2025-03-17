import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  tags: string[];
}

export function RecipeCard({ id, title, image, tags }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden group">
      <Link href={`/recipe/${id}`}>
        <div className="relative h-48 w-full">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            {/* Placeholder when image is loading or failed to load */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
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
          {/* Use img tag directly instead of next/image to avoid hydration issues */}
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
            crossOrigin="anonymous"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
