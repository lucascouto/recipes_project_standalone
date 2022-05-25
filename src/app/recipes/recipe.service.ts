import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [];

  private BASE_URL = 'http://localhost:3000/recipes';

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient
  ) {}

  getRecipe(id: number) {
    return this.http.get<Recipe>(`${this.BASE_URL}/${id}`);
  }

  getRecipes() {
    return this.http.get<Recipe[]>(`${this.BASE_URL}`);
  }

  addRecipe(recipe: Recipe): void {
    this.http.post<Recipe>(`${this.BASE_URL}`, recipe).subscribe();
  }

  editRecipe(recipe: Recipe, id: number): void {
    this.http.put<Recipe>(`${this.BASE_URL}/${id}`, recipe).subscribe();
  }

  deleteRecipe(id: number): void {
    this.http.delete(`${this.BASE_URL}/${id}`).subscribe();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
