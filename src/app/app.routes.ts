import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { Favorites } from './pages/favorites/favorites';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'recipe/:id', component: RecipeDetail },
  { path: 'favorites', component: Favorites },
  { path: '**', redirectTo: '' },
];
