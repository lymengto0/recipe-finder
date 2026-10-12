import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RecipeCard } from '../../components/recipe-card/recipe-card';
import { Category, MealSummary } from '../../models/meal';
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
  categories = signal<Category[]>([]);
  selectedCategory = signal('');
  heading = signal('');
  loading = signal(false);
  error = signal(false);

  ngOnInit() {
    this.recipeService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
    });
    this.search('chicken');
  }

  search(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;

    this.selectedCategory.set('');
    this.load(this.recipeService.searchMeals(trimmed), `Results for "${trimmed}"`);
  }

  selectCategory(name: string) {
    this.selectedCategory.set(name);
    this.query = '';
    this.load(this.recipeService.getMealsByCategory(name), `${name} recipes`);
  }
  skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  private retryAction: () => void = () => {};

  retry() {
    this.retryAction();
  }
  // handle loading error success
  private load(request: Observable<MealSummary[]>, heading: string) {
    this.retryAction = () => this.load(request, heading);
    this.loading.set(true);
    this.error.set(false);
    this.heading.set(heading);

    request.subscribe({
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
