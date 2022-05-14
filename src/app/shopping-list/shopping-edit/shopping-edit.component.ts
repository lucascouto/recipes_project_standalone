import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  name = '';
  amount = '';

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  onIngredientAdd(): void {
    this.ingredientAdded.emit({ name: this.name, amount: +this.amount });
  }
}
