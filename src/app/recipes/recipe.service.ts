import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
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

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes;
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
  }

  editRecipe(recipe: Recipe, index: number): void {
    this.recipes[index] = recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
