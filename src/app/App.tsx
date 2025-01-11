import { Toaster } from "@/components/ui/toaster";
import ImageUpload from "@/components/ImageUpload";
import RecipeList from "@/components/RecipeList";
import RecipeDetail from "@/components/RecipeDetail";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { initGemini, analyzeImage } from "@/utils/gemini";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Bookmark, Menu, ChefHat } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DietaryPreferences from "@/components/DietaryPreferences";
import { Recipe } from "@/types/recipe";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
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
        console.log("Gemini API initialized on page load");
      } catch (error) {
        console.error("Error initializing Gemini API:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Failed to initialize AI service. Please try again later.",
        });
      }
    };

    init();
  }, [toast]);

  const handleTogglePreference = (id: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleImageAnalysis = async (imageUrl: string) => {
    setIsLoading(true);
    try {
      const recipes = await analyzeImage(imageUrl, selectedPreferences);
      setRecipes(() => recipes); // Fixed by using function form of setState
      toast({
        title: "Analysis Complete",
        description: "Here are some recipes you can make!",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to analyze image. Please try again.",
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

  // const NavContent = () => (
  //   <>
  //     <Link
  //       to="/saved"
  //       className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
  //     >
  //       <Bookmark className="w-5 h-5" />
  //       <span>Saved Recipes</span>
  //     </Link>
  //     {userEmail && (
  //       <span className="text-sm text-gray-600 truncate max-w-[200px]">
  //         {userEmail}
  //       </span>
  //     )}
  //     <Button
  //       variant="outline"
  //       onClick={handleLogout}
  //       className="flex items-center gap-2"
  //     >
  //       <LogOut className="w-4 h-4" />
  //       <span className="hidden sm:inline">Logout</span>
  //     </Button>
  //   </>
  // );

  const NavContent = ({ isMobile = false }) => (
    <>
      <Link
        to="/saved"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bookmark className="w-5 h-5" />
        <span>Saved Recipes</span>
      </Link>
      {userEmail && (
        <>
          {isMobile ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 truncate">{userEmail}</p>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarFallback>
                    {userEmail.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 truncate">{userEmail}</p>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/">
              <h2 className="flex items-center justify-center gap-2">
                {/* <ChefHat className="h-7 w-7 mr-2 text-black" /> */}
                {/* <img
                  src="./dish.ico"
                  className="h-9 w-9 p-1 rounded-lg bg-slate-100"
                /> */}

                <h2 className="text-2xl rounded-lg bg-slate-200 p-1">🍜</h2>
                <span className="font-bold text-black text-xl">
                  RecipeLens AI
                </span>
              </h2>
            </Link>

            {/* Desktop Navigation */}
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <NavContent isMobile={false} />
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
                    <NavContent isMobile={true} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <p className="text-center mb-8 text-gray-600">
          Upload a photo of your ingredients and let AI suggest delicious
          recipes!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Dietary Preferences</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select any dietary restrictions or preferences before generating
                recipes:
              </p>
              <DietaryPreferences
                selectedPreferences={selectedPreferences}
                onTogglePreference={handleTogglePreference}
              />
            </div>
            <ImageUpload
              onImageUpload={handleImageAnalysis}
              isLoading={isLoading}
            />
          </Card>

          <div className="space-y-6">
            {recipes.length > 0 && (
              <RecipeList
                recipes={recipes.map((recipe) => ({
                  ...recipe,
                  ingredients: recipe.ingredients.map((ingredient) =>
                    typeof ingredient === "string"
                      ? { item: ingredient, quantity: "" }
                      : ingredient
                  ),
                }))}
                onSelectRecipe={(recipe) =>
                  setSelectedRecipe({
                    ...recipe,
                    ingredients: recipe.ingredients.map((ingredient) =>
                      typeof ingredient === "string"
                        ? { item: ingredient, quantity: "" }
                        : ingredient
                    ),
                  })
                }
              />
            )}
          </div>
        </div>

        {selectedRecipe && (
          <Dialog
            open={selectedRecipe !== null}
            onOpenChange={(open) => !open && setSelectedRecipe(null)}
          >
            <DialogContent className="max-w-[95vw] md:max-w-[85vw] lg:max-w-[75vw] max-h-[90vh] overflow-y-auto p-8">
              <RecipeDetail
                recipe={selectedRecipe}
                onBack={() => setSelectedRecipe(null)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default App;
