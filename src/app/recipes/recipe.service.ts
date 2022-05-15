import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    {
      name: 'A test recipe',
      description: 'this is a simply test',
      imagePath:
        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      ingredients: [
        { name: 'Meat', amount: 1 },
        { name: 'French Fries', amount: 20 },
      ],
    },
    {
      name: 'Another recipe',
      description: 'another teste recipe',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      ingredients: [
        { name: 'Buns', amount: 2 },
        { name: 'Meat', amount: 1 },
      ],
    },
  ];

  recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }
}
