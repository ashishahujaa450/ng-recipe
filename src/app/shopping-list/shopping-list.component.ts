import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as FromShoppingList from "./store/shopping.reducer";
import * as ShoppingListAction from "./store/shopping.action";
import { AppState } from "../store/app.reducer";
@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"],
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingListStore");

    // this.ingredients = this.shoppingListService.getRecipe;
  }

  editIngredient(index: number) {
    // this.shoppingListService.startEditing.next(index);
    this.store.dispatch(new ShoppingListAction.StartEdit(index));
  }
}
