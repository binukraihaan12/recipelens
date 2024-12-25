import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from "./Index";
import RecipeList from "@/components/RecipeList";
import RecipeDetail from "@/components/RecipeDetail";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const SavedRecipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { toast } = useToast();

  const { data: recipes, isLoading } = useQuery({
    queryKey: ['saved-recipes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saved_recipes')
        .select('*');
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load saved recipes",
        });
        throw error;
      }
      
      // Map the database fields to match our Recipe type
      return data.map(recipe => ({
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        imageUrl: recipe.image_url,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings
      })) as Recipe[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-[#2D3436] mb-8">
          Saved Recipes
        </h1>
        
        <div className="space-y-6">
          {selectedRecipe ? (
            <RecipeDetail 
              recipe={selectedRecipe} 
              onBack={() => setSelectedRecipe(null)} 
              hideActions={true} // Add this prop to hide the save button
            />
          ) : (
            recipes && recipes.length > 0 ? (
              <RecipeList 
                recipes={recipes} 
                onSelectRecipe={setSelectedRecipe} 
              />
            ) : (
              <div className="text-center text-gray-600">
                No saved recipes yet.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;