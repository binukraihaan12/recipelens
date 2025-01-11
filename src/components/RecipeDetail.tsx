import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  Users,
  BookmarkPlus,
  Check,
  Share2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  hideActions?: boolean;
}

interface Ingredient {
  item: string;
  quantity: string;
}

const formatIngredient = (ingredient: string | Ingredient): Ingredient => {
  if (typeof ingredient === "string") {
    // Handle "item - quantity" format from saved recipes
    const [item, quantity] = ingredient.split(" - ");
    return { item, quantity: quantity || "" };
  }
  return ingredient;
};

const RecipeDetail = ({
  recipe,
  onBack,
  hideActions = false,
}: RecipeDetailProps) => {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkIfRecipeIsSaved = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from("saved_recipes")
          .select("id")
          .eq("user_id", user.id)
          .eq("title", recipe.title);

        setIsSaved(data && data.length > 0);
      } catch (error) {
        console.error("Error checking saved recipe:", error);
      }
    };

    checkIfRecipeIsSaved();
  }, [recipe.title]);

  const handleSave = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase.from("saved_recipes").insert({
        user_id: user.id,
        title: recipe.title,
        ingredients: recipe.ingredients.map(
          (ing) => `${ing.item} - ${ing.quantity}`
        ),
        instructions: recipe.instructions,
        image_url: recipe.imageUrl,
        cooking_time: recipe.cookingTime,
        servings: recipe.servings,
      });

      if (error) throw error;

      setIsSaved(true);
      toast({
        title: "Success",
        description: "Recipe saved successfully!",
      });
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save recipe. Please try again.",
      });
    }
  };

  const handleShare = async () => {
    const recipeText = `
${recipe.title}

Cooking Time: ${recipe.cookingTime}
Servings: ${recipe.servings}

Ingredients:
${recipe.ingredients
  .map(formatIngredient)
  .map((ing) => `- ${ing.quantity} ${ing.item}`)
  .join("\n")}

Instructions:
${recipe.instructions.map((inst, i) => `${i + 1}. ${inst}`).join("\n")}
  `.trim();

    try {
      if (navigator.share) {
        await navigator.share({
          title: recipe.title,
          text: recipeText,
        });

        toast({
          title: "Success",
          description: "Recipe shared successfully!",
        });
      } else {
        // Fallback to clipboard copy for unsupported browsers
        await navigator.clipboard.writeText(recipeText);
        toast({
          title: "Success",
          description: "Recipe copied to clipboard!",
        });
      }
    } catch (error) {
      console.error("Error sharing recipe:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to share recipe. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6 p-6 border shadow-lg bg-white rounded-md">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>

        {!hideActions && (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaved}
            >
              {isSaved ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Recipe Saved
                </>
              ) : (
                <>
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Save Recipe
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <img
        src={
          "https://res.cloudinary.com/df0tyxxp4/image/upload/v1736342719/bg_zpy0bv.png"
        }
        alt={recipe.title}
        className="w-full h-[10.7rem] object-cover rounded-lg"
      />

      <h2 className="text-2xl font-serif">{recipe.title}</h2>

      <div className="flex space-x-4 text-gray-600">
        <div className="flex items-center space-x-1 cursor-pointer">
          <Clock className="h-4 w-4" />
          <span>{recipe.cookingTime}</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <Users className="h-4 w-4" />
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients
              .map(formatIngredient)
              .map((ingredient, index) => (
                <li key={index} className="text-gray-600">
                  {ingredient.quantity} {ingredient.item}
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-600">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
