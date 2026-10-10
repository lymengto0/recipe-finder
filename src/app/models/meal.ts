export interface MealSummary {
  id: string;
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
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}
