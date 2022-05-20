import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onIngredientAdd(ngForm: NgForm): void {
    if (ngForm.invalid) {
      ngForm.form.markAllAsTouched();
      return;
    }

    this.shoppingListService.addIngredient(ngForm.value as Ingredient);
  }
}
