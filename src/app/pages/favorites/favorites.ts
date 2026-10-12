import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeCard } from '../../components/recipe-card/recipe-card';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-favorites',
  imports: [RecipeCard, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  favorites = inject(FavoritesService).favorites;
}