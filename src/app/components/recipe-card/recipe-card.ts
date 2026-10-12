import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MealSummary } from '../../models/meal';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  private favorites = inject(FavoritesService);

  meal = input.required<MealSummary>();
  isFavorite = computed(() => this.favorites.isFavorite(this.meal().id));

  toggleFavorite() {
    this.favorites.toggle(this.meal());
  }
}