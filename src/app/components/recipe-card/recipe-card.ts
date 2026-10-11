import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MealSummary } from '../../models/meal';

@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  meal = input.required<MealSummary>();
}
