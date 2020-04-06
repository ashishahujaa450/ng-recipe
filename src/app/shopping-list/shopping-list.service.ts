import { Injectable, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  public startEditing = new Subject<number>();

  get getRecipe() {
    return this.ingredients;
  }

  constructor() {}

  addIngredient(ingred: Ingredient) {
    this.ingredients.push(ingred);
  }

  addIngredients(ingred: Ingredient[]) {
    this.ingredients.push(...ingred);
  }

  getIngredientById(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }
}
