import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.route.params.subscribe((param) => {
      this.recipe = this.recipeService.getRecipe(param['id']);
      this.recipeForm.patchValue(this.recipe);
    });
  }

  private createForm(): void {
    this.recipeForm = this.fb.group({
      name: [null, Validators.required],
      description: [null],
      imagePath: [null],
      ingredients: this.fb.array([]),
    });
  }

  onSubmit(): void {
    console.log(this.recipeForm.value);
  }
}
