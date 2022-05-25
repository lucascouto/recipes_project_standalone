import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId = 0;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeId = +params['id'];
      this.recipeService
        .getRecipe(this.recipeId)
        .subscribe((recipe) => (this.recipe = recipe));
    });
  }

  addIngredientsToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  delete(recipeId: number): void {
    this.recipeService.deleteRecipe(recipeId);

    this.recipeService
      .getRecipes()
      .subscribe((recipes) => this.recipeService.updatedRecipes.next(recipes));

    this.router.navigate(['/recipes']);
  }
}
