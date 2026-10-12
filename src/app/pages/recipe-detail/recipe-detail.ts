import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meal } from '../../models/meal';
import { RecipeService } from '../../services/recipe';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-recipe-detail',
  imports: [RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  favorites = inject(FavoritesService)

  meal = signal<Meal | null>(null);
  loading = signal(true);
  error = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set(true);
      this.loading.set(false);
      return;
    }

    this.recipeService.getMealById(id).subscribe({
      next: (meal) => {
        this.meal.set(meal);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}