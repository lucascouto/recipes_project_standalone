import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    merge(
      this.recipeService.getRecipes(),
      this.recipeService.updatedRecipes
    ).subscribe((recipes) => (this.recipes = recipes));
  }
}
