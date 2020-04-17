import { Ingredient } from "../../shared/ingredient.model";

import * as shoppingAction from "./shopping.action";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient("apples", 5), new Ingredient("banana", 15)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function ShoppingListReducer(
  state = initialState,
  action: shoppingAction.ShoppingActionList
) {
  switch (action.type) {
    case shoppingAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
      break;

    case shoppingAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
      break;

    case shoppingAction.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.newIngredient,
      };

      const updateIngredients = [...state.ingredients];
      updateIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: updateIngredients,
      };
      break;

    case shoppingAction.DELETE_INGREDIENT:
      // const updatedList = state.ingredients.splice(action.payload, 1);

      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== action.payload;
        }),
      };
      break;

    case shoppingAction.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
      break;

    case shoppingAction.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
      break;

    default:
      return state;
  }
}
