import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  name = '';
  amount = '';

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onIngredientAdd(): void {
    this.shoppingListService.addIngredient({
      name: this.name,
      amount: +this.amount,
    });
  }
}
