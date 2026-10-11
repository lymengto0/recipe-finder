import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeCard } from '../../components/recipe-card/recipe-card';
import { MealSummary } from '../../models/meal';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RecipeCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private recipeService = inject(RecipeService);

  query = '';
  meals = signal<MealSummary[]>([]);
  loading = signal(false);
  error = signal(false);
  searchedTerm = signal('');

  ngOnInit() {
    this.search('chicken'); // show something on first load
  }

  search(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;

    this.loading.set(true);
    this.error.set(false);
    this.searchedTerm.set(trimmed);

    this.recipeService.searchMeals(trimmed).subscribe({
      next: (meals) => {
        this.meals.set(meals);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}