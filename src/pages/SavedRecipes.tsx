import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from "../app/App";
import RecipeList from "@/components/RecipeList";
import RecipeDetail from "@/components/RecipeDetail";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut, ChefHat, Menu, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const SavedRecipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

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

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["saved-recipes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("saved_recipes").select("*");

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load saved recipes",
        });
        throw error;
      }

      return data.map((recipe) => ({
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        imageUrl: recipe.image_url,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings,
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

  const NavContent = ({ isMobile = false }) => (
    <>
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

  const filteredRecipes = recipes?.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="min-h-screen bg-[#FAFAFA]">
    //   <nav className="border-b bg-white">
    //     <div className="container mx-auto px-4 py-3">
    //       <div className="flex justify-between items-center">
    //         <h1 className="text-2xl font-serif text-[#2D3436]">
    //           Saved Recipes
    //         </h1>

    //         {/* Desktop Navigation */}
    //         <div className="hidden md:flex items-center gap-4">
    //           <NavContent />
    //         </div>

    //         {/* Mobile Navigation */}
    //         <div className="md:hidden">
    //           <Sheet>
    //             <SheetTrigger asChild>
    //               <Button variant="ghost" size="icon">
    //                 <Menu className="h-6 w-6" />
    //               </Button>
    //             </SheetTrigger>
    //             <SheetContent>
    //               <SheetHeader>
    //                 <SheetTitle>Menu</SheetTitle>
    //               </SheetHeader>
    //               <div className="flex flex-col gap-4 mt-4">
    //                 <NavContent />
    //               </div>
    //             </SheetContent>
    //           </Sheet>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>

    //   <div className="container mx-auto px-4 py-8">
    //     <div className="space-y-6">
    //       {selectedRecipe ? (
    //         <RecipeDetail
    //           recipe={selectedRecipe}
    //           onBack={() => setSelectedRecipe(null)}
    //           hideActions={true}
    //         />
    //       ) : (
    //         recipes && recipes.length > 0 ? (
    //           <RecipeList
    //             recipes={recipes}
    //             onSelectRecipe={setSelectedRecipe}
    //           />
    //         ) : (
    //           <div className="text-center text-gray-600">
    //             No saved recipes yet.
    //           </div>
    //         )
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-[#FAFAFA]">
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/app">
              <h2 className="flex items-center justify-center gap-2">
                <h2 className="text-2xl rounded-lg bg-slate-200 p-1">🍜</h2>
                <span className="font-bold text-gray-900 text-xl">
                  RecipeLens AI <span className="text-sm">&#40;App&#41;</span>
                </span>
              </h2>
            </Link>

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
          {!selectedRecipe && (
            <div className="max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {selectedRecipe ? (
            <RecipeDetail
              recipe={{
                ...selectedRecipe,
                imageUrl:
                  selectedRecipe.imageUrl ||
                  "https://res.cloudinary.com/df0tyxxp4/image/upload/v1735469852/p_jouilc.png",
                cookingTime: selectedRecipe.cookingTime || "",
                servings: Number(selectedRecipe.servings) || 0,
              }}
              onBack={() => setSelectedRecipe(null)}
              hideActions={true}
            />
          ) : filteredRecipes && filteredRecipes.length > 0 ? (
            <RecipeList
              recipes={filteredRecipes.map((recipe) => ({
                ...recipe,
                imageUrl: recipe.imageUrl || "",
                servings: Number(recipe.servings) || 0,
                cookingTime: recipe.cookingTime || "",
              }))}
              onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
            />
          ) : (
            <div className="text-center text-gray-600">
              {recipes && recipes.length > 0
                ? "No matching recipes found."
                : "No saved recipes yet."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
