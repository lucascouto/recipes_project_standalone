import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, RecipeListComponent],
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {}
