import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private BASE_URL =
    'https://ng-recipe-book-b089c-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipes() {
    this.recipeService
      .getRecipes()
      .pipe(
        switchMap((recipes) => {
          return this.http.put(`${this.BASE_URL}/recipes.json`, recipes);
        })
      )
      .subscribe();
  }
}
