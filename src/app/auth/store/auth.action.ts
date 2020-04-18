import { Action } from "@ngrx/store";

export const LOGIN = "[auth] login";
export const LOGOUT = "[auth] logout";

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string;
      userid: string;
      token: string;
      tokenExpiration: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;
