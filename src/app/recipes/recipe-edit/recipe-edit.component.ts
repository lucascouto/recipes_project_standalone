import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipeImg = '';
  idRecipe = -1;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadIngredient();
  }

  private createForm(): void {
    this.recipeForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
      ingredients: this.fb.array([]),
    });
  }

  private loadIngredient(): void {
    this.route.params.subscribe((param) => {
      this.idRecipe = param['id'] ? param['id'] : -1;
      const recipe = this.recipeService.getRecipe(this.idRecipe);
      this.recipeImg = recipe?.imagePath;
      if (recipe?.ingredients) {
        for (const ingredient of recipe.ingredients) {
          (this.recipeForm.get('ingredients') as FormArray).push(
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

  onSubmit(): void {
    this.recipeForm.markAllAsTouched();

    if (this.recipeForm.invalid) {
      return;
    }

    const recipe = this.recipeForm.value as Recipe;
    if (this.isNewRecipe) {
      this.recipeService.addRecipe(recipe);
      this.recipeForm.reset();
      this.recipeImg = '';
    } else {
      this.recipeService.editRecipe(recipe, this.idRecipe);
      this.router.navigate(['/recipes', this.idRecipe]);
    }
  }

  changeImage(event: Event): void {
    const imgUrl = (event.target as HTMLInputElement).value;
    this.recipeImg = imgUrl;
  }

  getIngredientsControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  removeIngredientCtrl(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  addIngredientCtrl(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
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

  private get isNewRecipe() {
    return this.idRecipe === -1;
  }

  getFormControl(control: string | string[]): AbstractControl {
    return this.recipeForm.get(control);
  }
}
