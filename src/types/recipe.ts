export interface Recipe {
  title: string;
  ingredients: Array<{ item: string; quantity: string }>;
  instructions: string[];
  imageUrl: string;
  cookingTime: string;
  servings: number;
}
