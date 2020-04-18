import { User } from "../user.mode";
import { Action } from "@ngrx/store";

import * as FromAuthAction from "./auth.action";

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function AuthReducer(
  state = initialState,
  action: FromAuthAction.AuthActions
) {
  switch (action.type) {
    case FromAuthAction.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userid,
        action.payload.token,
        action.payload.tokenExpiration
      );

      return {
        ...state,
        user: user,
      };
      break;

    case FromAuthAction.LOGOUT:
      return {
        ...state,
        user: null,
      };
      break;

    default:
      return state;
  }
}
