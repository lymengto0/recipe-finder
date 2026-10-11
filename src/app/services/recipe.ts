import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Meal, MealSummary } from '../models/meal';

const API_URL = 'http://localhost:5207/api';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);

  /** Search meals by name. */
  searchMeals(query: string): Observable<MealSummary[]> {
    return this.http.get<MealSummary[]>(`${API_URL}/meals`, { params: { search: query } });
  }

  /** Get one full meal (with ingredients) by id. */
  getMealById(id: number | string): Observable<Meal> {
    return this.http.get<Meal>(`${API_URL}/meals/${id}`);
  }

  /** Get all categories. */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/categories`);
  }

  /** Get meals in a category. */
  getMealsByCategory(category: string): Observable<MealSummary[]> {
    return this.http.get<MealSummary[]>(`${API_URL}/meals`, { params: { category } });
  }

  /** Get one random meal. */
  getRandomMeal(): Observable<Meal> {
    return this.http.get<Meal>(`${API_URL}/meals/random`);
  }
}