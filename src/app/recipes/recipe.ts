import { Ingredient } from '../shared/ingredient';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}
