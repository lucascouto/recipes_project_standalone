import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  ingredientIndex = 0;
  @ViewChild('ingredientForm') ngForm: NgForm;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.ingredientToEdit.subscribe((index) => {
      this.editMode = true;
      this.ingredientIndex = index;
      const ingredient = this.shoppingListService.getIngredient(index);
      this.ngForm.form.patchValue(ingredient);
    });
  }

  addOrEditIngredient(): void {
    if (this.ngForm.invalid) {
      this.ngForm.form.markAllAsTouched();
      return;
    }

    const ingredient = this.ngForm.value as Ingredient;

    if (this.editMode) {
      this.shoppingListService.editIngredient(ingredient, this.ingredientIndex);
      this.editMode = false;
      this.ngForm.reset();
      return;
    }
    this.shoppingListService.addIngredient(ingredient);
    this.ngForm.reset();
  }
}
