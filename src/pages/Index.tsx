import { useState, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";
import RecipeList from "@/components/RecipeList";
import RecipeDetail from "@/components/RecipeDetail";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { initGemini, analyzeImage } from "@/utils/gemini";

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

  useEffect(() => {
    const init = async () => {
      try {
        await initGemini();
        console.log('Gemini API initialized on page load');
      } catch (error) {
        console.error('Error initializing Gemini API:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to initialize AI service. Please try again later.",
        });
      }
    };
    
    init();
  }, [toast]);

  const handleImageAnalysis = async (imageUrl: string) => {
    setIsLoading(true);
    try {
      const suggestions = await analyzeImage(imageUrl);
      setRecipes(suggestions);
      toast({
        title: "Analysis Complete",
        description: "Here are some recipes you can make!",
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze image. Please try again.",
      });
      setRecipes([]);
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