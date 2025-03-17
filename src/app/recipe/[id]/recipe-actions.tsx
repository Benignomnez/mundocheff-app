"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RecipeActionsProps {
  recipeId: number;
  recipeTitle: string;
}

export default function RecipeActions({
  recipeId,
  recipeTitle,
}: RecipeActionsProps) {
  // Función para guardar la receta (simulada)
  const handleSaveRecipe = () => {
    toast.success(`Receta "${recipeTitle}" guardada en favoritos`);
  };

  // Función para imprimir la receta
  const handlePrintRecipe = () => {
    window.print();
  };

  return (
    <>
      <Button
        className="bg-emerald-600 hover:bg-emerald-700"
        onClick={handleSaveRecipe}
      >
        Guardar Receta
      </Button>
      <Button
        variant="outline"
        className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
        onClick={handlePrintRecipe}
      >
        Imprimir Receta
      </Button>
    </>
  );
}
