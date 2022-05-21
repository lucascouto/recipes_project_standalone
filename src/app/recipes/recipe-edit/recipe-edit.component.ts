import { ThisReceiver } from '@angular/compiler';
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
    this.route.params.subscribe((param) => {
      this.idRecipe = param['id'];
      const recipe = this.recipeService.getRecipe(this.idRecipe);
      this.recipeImg = recipe?.imagePath;
      if (recipe?.ingredients) {
        for (const ingredient of recipe.ingredients) {
          (this.recipeForm.get('ingredients') as FormArray).push(
            this.fb.group({
              name: [ingredient.name],
              amount: [ingredient.amount],
            })
          );
        }
      }
      this.recipeForm.patchValue(recipe);
    });
  }

  private createForm(): void {
    this.recipeForm = this.fb.group({
      name: [null, Validators.required],
      description: [null],
      imagePath: [null],
      ingredients: this.fb.array([
        this.fb.group({
          name: [null],
          amount: [null],
        }),
      ]),
    });
  }

  onSubmit(): void {
    const recipe = this.recipeForm.value as Recipe;
    if (this.isNewRecipe) {
      this.recipeService.addRecipe(recipe);
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
        name: [null],
        amount: [null],
      })
    );
  }

  private get isNewRecipe() {
    return this.idRecipe === -1;
  }
}
