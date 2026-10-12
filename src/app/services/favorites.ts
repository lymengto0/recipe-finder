import { Injectable, computed, signal } from '@angular/core';
import { MealSummary } from '../models/meal';

const STORAGE_KEY = 'recipe-finder-favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private _favorites = signal<MealSummary[]>(this.load());

  
  favorites = this._favorites.asReadonly();
  count = computed(() => this._favorites().length);

  isFavorite(id: number): boolean {
    return this._favorites().some((m) => m.id === id);
  }

  toggle(meal: MealSummary) {
    const current = this._favorites();
    const next = this.isFavorite(meal.id)
      ? current.filter((m) => m.id !== meal.id)
      : [...current, { id: meal.id, name: meal.name, thumbnail: meal.thumbnail }];

    this._favorites.set(next);
    this.save(next);
  }

  private load(): MealSummary[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(list: MealSummary[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // storage full or blocked: the app still works, it just won't persist
    }
  }
}