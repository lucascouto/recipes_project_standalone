import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientSelected: Ingredient;
  private ingredientChangeSub: Subscription;

  constructor(private shoppingListSerice: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListSerice.getIngredients();
    this.ingredientChangeSub =
      this.shoppingListSerice.ingredientsChanged.subscribe(
        (ingredients) => (this.ingredients = ingredients)
      );
  }

  ngOnDestroy(): void {
    this.ingredientChangeSub.unsubscribe();
  }
}
