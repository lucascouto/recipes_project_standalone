import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeInfo = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  onClickRecipe(): void {
    this.recipeInfo.emit(this.recipe);
  }
}
