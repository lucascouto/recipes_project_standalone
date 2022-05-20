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
  ingredientIndex: number;
  @ViewChild('ingredientForm') ngForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.ingredientToEdit.subscribe((index) => {
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

    if (this.ingredientIndex > -1) {
      this.shoppingListService.editIngredient(ingredient, this.ingredientIndex);
      return;
    }
    this.shoppingListService.addIngredient(ingredient);
  }
}
