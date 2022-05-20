import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientToEdit = new Subject<number>();

  private ingredients: Ingredient[] = [
    {
      name: 'Apples',
      amount: 5,
    },
    {
      name: 'Tomatoes',
      amount: 10,
    },
  ];

  constructor() {}

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  editIngredient(ingredient: Ingredient, index: number): void {
    this.ingredients[index] = ingredient;
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }
}
