import { Component, OnInit, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private recipeService = inject(RecipeService);

  ngOnInit() {
    this.recipeService.searchMeals('chicken').subscribe((meals) => console.log('Search:', meals));
    this.recipeService.getCategories().subscribe((cats) => console.log('Categories:', cats));
    this.recipeService.getMealsByCategory('Seafood').subscribe((meals) => console.log('Seafood:', meals));
  }
}