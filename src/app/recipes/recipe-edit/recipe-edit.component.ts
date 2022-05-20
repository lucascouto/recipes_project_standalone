import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipeImg = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.route.params.subscribe((param) => {
      const recipe = this.recipeService.getRecipe(param['id']);
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
    console.log(this.recipeForm.value);
  }

  changeImage(event: Event): void {
    const imgUrl = (event.target as HTMLInputElement).value;
    this.recipeImg = imgUrl;
  }

  getIngredientsControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
