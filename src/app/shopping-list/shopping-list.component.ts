import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@Component({
  standalone: true,
  imports: [ShoppingEditComponent],
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  ingredientSelected: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  editIngredient(index: number): void {
    this.shoppingListService.ingredientToEdit.next(index);
  }
}
