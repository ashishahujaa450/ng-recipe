import { Injectable, EventEmitter, OnDestroy } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";

import * as shoppingListAction from "./../shopping-list/store/shopping.action";

import * as FromShoppingList from "./../shopping-list/store/shopping.reducer";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  selectedRecipe = new Subject<Recipe>();

  private recipes: Recipe[] = [];
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<FromShoppingList.AppState>
  ) {}

  get getRecipe() {
    return this.recipes;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  addShoppingListIngredient(ingredient: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredient);
    this.store.dispatch(new shoppingListAction.AddIngredients(ingredient));
  }

  getSingleRecipe(id: number) {
    return this.recipes[id];
  }

  replceRecipes(newList: Recipe[]) {
    this.recipes.splice(0, 100);

    newList.forEach((elm) => {
      this.recipes.push(elm);
    });
  }
}
