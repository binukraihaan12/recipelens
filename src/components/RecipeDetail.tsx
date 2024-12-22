import { Recipe } from "@/pages/Index";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, Users } from "lucide-react";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetail = ({ recipe, onBack }: RecipeDetailProps) => {
  return (
    <Card className="p-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to recipes
      </Button>

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