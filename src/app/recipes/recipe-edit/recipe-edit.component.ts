import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeForm: UntypedFormGroup;
  idRecipe = 0;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadRecipe();
  }

  private createForm(): void {
    this.recipeForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
      ingredients: this.fb.array([]),
    });
  }

  private loadRecipe(): void {
    this.route.params.subscribe((param) => {
      this.idRecipe = param['id'];

      if (this.idRecipe) {
        this.recipeService.getRecipe(this.idRecipe).subscribe((recipe) => {
          if (recipe?.ingredients) {
            for (const ingredient of recipe.ingredients) {
              (this.recipeForm.get('ingredients') as UntypedFormArray).push(
                this.fb.group({
                  name: [ingredient.name, Validators.required],
                  amount: [
                    ingredient.amount,
                    [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
                  ],
                })
              );
            }
          }
          this.recipeForm.patchValue(recipe);
        });
      }
    });
  }

  onSubmit(): void {
    this.recipeForm.markAllAsTouched();

    if (this.recipeForm.invalid) {
      return;
    }

    const recipe = this.recipeForm.value as Recipe;

    if (this.isNewRecipe) {
      this.recipeService.addRecipe(recipe);
      this.recipeForm.reset();
    } else {
      this.recipeService.editRecipe(recipe, this.idRecipe);
      this.router.navigate(['/recipes', this.idRecipe]);
    }

    this.recipeService
      .getRecipes()
      .subscribe((recipes) => this.recipeService.updatedRecipes.next(recipes));
  }

  getIngredientsControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as UntypedFormArray).controls;
  }

  removeIngredientCtrl(index: number): void {
    (this.recipeForm.get('ingredients') as UntypedFormArray).removeAt(index);
  }

  addIngredientCtrl(): void {
    (this.recipeForm.get('ingredients') as UntypedFormArray).push(
      this.fb.group({
        name: [null, Validators.required],
        amount: [
          null,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
        ],
      })
    );
  }

  showInputErrors(control: string | string[]): boolean {
    return (
      this.recipeForm.get(control).invalid &&
      this.recipeForm.get(control).touched
    );
  }

  get isNewRecipe() {
    return !this.idRecipe;
  }

  getFormControl(control: string | string[]): AbstractControl {
    return this.recipeForm.get(control);
  }
}
