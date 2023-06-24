import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RecipeItemComponent, RouterLink],
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
