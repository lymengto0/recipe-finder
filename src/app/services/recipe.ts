import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category, Ingredient, Meal, MealSummary } from '../models/meal';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Raw data api string or null
type ApiMeal = Record<string, string | null>;

function toSummary(m: ApiMeal): MealSummary {
  return {
    id: m['idMeal'] ?? '',
    name: m['strMeal'] ?? '',
    thumbnail: m['strMealThumb'] ?? '',
  };
}

function toMeal(m: ApiMeal): Meal {
  const ingredients: Ingredient[] = [];

  // The API has strIngredient1..20 and strMeasure1..20
  for (let i = 1; i <= 20; i++) {
    const name = m[`strIngredient${i}`]?.trim();
    if (name) {
      ingredients.push({
        name,
        measure: m[`strMeasure${i}`]?.trim() ?? '',
      });
    }
  }

  return {
    ...toSummary(m),
    category: m['strCategory'] ?? '',
    area: m['strArea'] ?? '',
    instructions: m['strInstructions'] ?? '',
    youtubeUrl: m['strYoutube'] ?? '',
    ingredients,
  };
}

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);

  /** Search meals by name. Returns full meals. */
  searchMeals(query: string): Observable<Meal[]> {
    return this.http
      .get<{ meals: ApiMeal[] | null }>(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`)
      .pipe(map((res) => (res.meals ?? []).map(toMeal)));
  }

  /** Get one full meal by its id. Returns null if not found. */
  getMealById(id: string): Observable<Meal | null> {
    return this.http
      .get<{ meals: ApiMeal[] | null }>(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`)
      .pipe(map((res) => (res.meals?.[0] ? toMeal(res.meals[0]) : null)));
  }

  /** Get all categories (Beef, Chicken, Dessert...). */
  getCategories(): Observable<Category[]> {
    return this.http
      .get<{ categories: Record<string, string>[] }>(`${BASE_URL}/categories.php`)
      .pipe(
        map((res) =>
          res.categories.map((c) => ({
            id: c['idCategory'],
            name: c['strCategory'],
            thumbnail: c['strCategoryThumb'],
            description: c['strCategoryDescription'],
          })),
        ),
      );
  }

  /** Get meals in a category. Returns summaries only (id, name, image). */
  getMealsByCategory(category: string): Observable<MealSummary[]> {
    return this.http
      .get<{ meals: ApiMeal[] | null }>(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)
      .pipe(map((res) => (res.meals ?? []).map(toSummary)));
  }

  /** Get one random meal. */
  getRandomMeal(): Observable<Meal> {
    return this.http
      .get<{ meals: ApiMeal[] }>(`${BASE_URL}/random.php`)
      .pipe(map((res) => toMeal(res.meals[0])));
  }
}
