import ImageUpload from "@/components/ImageUpload";
import RecipeList from "@/components/RecipeList";
import RecipeDetail from "@/components/RecipeDetail";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { initGemini, analyzeImage } from "@/utils/gemini";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  cookingTime: string;
  servings: number;
}

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-serif text-[#2D3436]">
              AI Recipe Generator
            </h1>
            <div className="flex items-center gap-4">
              <Link 
                to="/saved"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bookmark className="w-5 h-5" />
                <span>Saved Recipes</span>
              </Link>
              {userEmail && (
                <span className="text-sm text-gray-600">
                  {userEmail}
                </span>
              )}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
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

export default App;