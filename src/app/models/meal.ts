export interface MealSummary {
  id: number;
  name: string;
  thumbnail: string;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface Meal extends MealSummary {
  category: string;
  area: string;
  instructions: string;
  youtubeUrl: string;
  ingredients: Ingredient[];
}

export interface Category {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
}