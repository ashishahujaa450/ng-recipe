import { User } from "../user.mode";
import { Action } from "@ngrx/store";

import * as FromAuthAction from "./auth.action";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
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
        authError: null,
        loading: false,
      };
      break;

    case FromAuthAction.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
        loading: false,
      };
      break;

    case FromAuthAction.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
      break;

    case FromAuthAction.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
