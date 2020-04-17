import * as FromShoppingList from "./../shopping-list/store/shopping.reducer";
import * as FromAuth from "./../auth/store/auth.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  shoppingListStore: FromShoppingList.State;
  auth: FromAuth.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  shoppingListStore: FromShoppingList.ShoppingListReducer,
  auth: FromAuth.AuthReducer,
};
