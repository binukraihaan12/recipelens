import { Recipe } from "@/pages/Index";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, Users, BookmarkPlus, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  hideActions?: boolean;
}

const RecipeDetail = ({ recipe, onBack, hideActions = false }: RecipeDetailProps) => {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkIfRecipeIsSaved = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('saved_recipes')
          .select('id')
          .eq('user_id', user.id)
          .eq('title', recipe.title)
          .single();

        setIsSaved(!!data);
      } catch (error) {
        console.error('Error checking saved recipe:', error);
      }
    };

    checkIfRecipeIsSaved();
  }, [recipe.title]);

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('saved_recipes')
        .insert({
          user_id: user.id,
          title: recipe.title,
          ingredients: recipe.ingredients,
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
      console.error('Error saving recipe:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save recipe. Please try again.",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to recipes
        </Button>
        
        {!hideActions && (
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
        )}
      </div>

      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-lg mb-6"
      />

      <h2 className="text-2xl font-serif mb-4">{recipe.title}</h2>

      <div className="flex space-x-4 mb-6 text-gray-600">
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{recipe.cookingTime}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4" />
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-600">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </Card>
  );
};

export default RecipeDetail;