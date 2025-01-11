import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type DietaryPreference = {
  id: string;
  label: string;
  description: string;
};

export const DIETARY_PREFERENCES: DietaryPreference[] = [
  {
    id: "vegetarian",
    label: "Vegetarian",
    description: "Excludes meat, fish, and poultry but includes dairy and eggs",
  },
  {
    id: "vegan",
    label: "Vegan",
    description:
      "Excludes all animal products including dairy, eggs, and honey",
  },
  {
    id: "gluten-free",
    label: "Gluten-Free",
    description: "Excludes wheat, barley, rye, and their derivatives",
  },
  {
    id: "dairy-free",
    label: "Dairy-Free",
    description: "Excludes milk and milk products",
  },
  {
    id: "low-carb",
    label: "Low-Carb",
    description: "Limits carbohydrates, focusing on proteins and healthy fats",
  },
  {
    id: "keto",
    label: "Keto",
    description: "Very low-carb diet with high fat and moderate protein",
  },
];

interface DietaryPreferencesProps {
  selectedPreferences: string[];
  onTogglePreference: (id: string) => void;
}

const DietaryPreferences = ({
  selectedPreferences,
  onTogglePreference,
}: DietaryPreferencesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <TooltipProvider>
        {DIETARY_PREFERENCES.map((preference) => {
          const isSelected = selectedPreferences.includes(preference.id);
          return (
            <Tooltip key={preference.id}>
              <TooltipTrigger>
                <Badge
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer text-base rounded-md py-1 px-3 transition-colors ${
                    isSelected
                      ? "bg-green-100 hover:bg-green-200 text-green-700 border-green-200"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => onTogglePreference(preference.id)}
                >
                  {isSelected && (
                    <Check className="w-4 h-4 mr-1 text-green-700" />
                  )}
                  {preference.label}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{preference.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};

export default DietaryPreferences;
