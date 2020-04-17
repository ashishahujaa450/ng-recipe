import { User } from "../user.mode";
import { Action } from "@ngrx/store";

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function AuthReducer(state = initialState, action: Action) {
  return {
    ...state,
  };
}
