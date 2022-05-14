import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeInfo = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    {
      name: 'A test recipe',
      description: 'this is a simply test',
      imagePath:
        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    },
    {
      name: 'Another recipe',
      description: 'another teste recipe',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onGetRecipeInfo(recipe: Recipe): void {
    this.recipeInfo.emit(recipe);
  }
}
