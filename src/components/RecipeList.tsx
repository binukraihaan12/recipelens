// import { Recipe } from "@/pages/Index";
// import { Card } from "@/components/ui/card";
// import { Clock, Users } from "lucide-react";

// interface RecipeListProps {
//   recipes: Recipe[];
//   onSelectRecipe: (recipe: Recipe) => void;
// }

// const RecipeList = ({ recipes, onSelectRecipe }: RecipeListProps) => {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-serif mb-4">Suggested Recipes</h2>
//       <div className="grid gap-4">
//         {recipes.map((recipe, index) => (
//           <Card
//             key={index}
//             className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
//             onClick={() => onSelectRecipe(recipe)}
//           >
//             <div className="flex space-x-4">
//               <img
//                 src={recipe.imageUrl}
//                 alt={recipe.title}
//                 className="w-24 h-24 rounded-lg object-cover"
//               />
//               <div className="flex-1">
//                 <h3 className="font-serif text-lg mb-2">{recipe.title}</h3>
//                 <div className="flex space-x-4 text-sm text-gray-600">
//                   <div className="flex items-center space-x-1">
//                     <Clock className="h-4 w-4" />
//                     <span>{recipe.cookingTime}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Users className="h-4 w-4" />
//                     <span>{recipe.servings} servings</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecipeList;

import { Recipe } from "@/pages/Index";
import { Card } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";
import { useLocation } from "react-router-dom";

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeList = ({ recipes, onSelectRecipe }: RecipeListProps) => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("/saved")) {
      return "Saved Recipes";
    }
    if (location.pathname.includes("/app")) {
      return "Suggested Recipes";
    }
    return "Recipes";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif mb-4">{getTitle()}</h2>
      <div className="grid gap-4">
        {recipes.map((recipe, index) => (
          <Card
            key={index}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectRecipe(recipe)}
          >
            <div className="flex space-x-4">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-serif text-lg mb-2">{recipe.title}</h3>
                <div className="flex space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
