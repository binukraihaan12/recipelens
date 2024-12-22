import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import RecipeList from "@/components/RecipeList";
import RecipeDetail from "@/components/RecipeDetail";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  cookingTime: string;
  servings: number;
}

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageAnalysis = async (imageUrl: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, we would send the image to Gemini API
      // For now, we'll simulate the response
      const mockRecipes: Recipe[] = [
        {
          title: "Creamy Pasta Primavera",
          ingredients: ["Pasta", "Broccoli", "Carrots", "Cream", "Garlic"],
          instructions: [
            "Boil pasta according to package instructions",
            "Sauté vegetables in olive oil",
            "Combine with cream sauce",
          ],
          imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
          cookingTime: "30 mins",
          servings: 4,
        },
        {
          title: "Garden Fresh Salad",
          ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Olive Oil", "Vinegar"],
          instructions: [
            "Wash and chop vegetables",
            "Combine in a large bowl",
            "Dress with olive oil and vinegar",
          ],
          imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
          cookingTime: "15 mins",
          servings: 2,
        },
      ];
      
      setRecipes(mockRecipes);
      toast({
        title: "Analysis Complete",
        description: "Here are some recipes you can make!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze image. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-center mb-8 text-[#2D3436]">
          AI Recipe Generator
        </h1>
        <p className="text-center mb-12 text-gray-600">
          Upload a photo of your ingredients and let AI suggest delicious recipes!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <ImageUpload onImageUpload={handleImageAnalysis} isLoading={isLoading} />
          </Card>
          
          <div className="space-y-6">
            {recipes.length > 0 && !selectedRecipe && (
              <RecipeList recipes={recipes} onSelectRecipe={setSelectedRecipe} />
            )}
            {selectedRecipe && (
              <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;