import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = "[shopping list] add ingredient";
export const ADD_INGREDIENTS = "[shopping list] add ingredients";
export const UPDATE_INGREDIENT = "[shopping list] update ingredient";
export const DELETE_INGREDIENT = "[shopping list] delete ingredient";
export const START_EDIT = "[shopping list] start edit";
export const STOP_EDIT = "[shopping list] stop edit";

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: { index: number; newIngredient: Ingredient }) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: number) {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

//type of actions for ts
export type ShoppingActionList =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
