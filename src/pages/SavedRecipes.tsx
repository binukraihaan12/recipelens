import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from "../app/App";
import RecipeList from "@/components/RecipeList";
import RecipeDetail from "@/components/RecipeDetail";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut, ChefHat, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SavedRecipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const NavContent = () => (
    <>
      <Link 
        to="/app"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChefHat className="w-5 h-5" />
        <span>Dish Detective</span>
      </Link>
      {userEmail && (
        <span className="text-sm text-gray-600 truncate max-w-[200px]">
          {userEmail}
        </span>
      )}
      <Button
        variant="outline"
        onClick={handleLogout}
        className="flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-serif text-[#2D3436]">
              Saved Recipes
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <NavContent />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-4">
                    <NavContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {selectedRecipe ? (
            <RecipeDetail 
              recipe={selectedRecipe} 
              onBack={() => setSelectedRecipe(null)} 
              hideActions={true}
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