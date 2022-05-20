import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnChanges {
  @Input() ingredient: Ingredient;
  @ViewChild('ingredientForm') ngForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnChanges(): void {
    this.ngForm?.form.patchValue(this.ingredient);
  }

  onIngredientAdd(): void {
    if (this.ngForm.invalid) {
      this.ngForm.form.markAllAsTouched();
      return;
    }

    this.shoppingListService.addIngredient(this.ngForm.value as Ingredient);
  }
}
