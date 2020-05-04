import { Action } from "@ngrx/store";
import { SignUp } from "../auth.model";

export const LOGIN = "[auth] login";
export const LOGOUT = "[auth] logout";
export const LOGIN_START = "[auth] login start";
export const LOGIN_FAIL = "[auth] login fail";
export const SIGNUP_START = "[auth] signup start";

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

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: SignUp) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: SignUp) {}
}

export type AuthActions = Login | Logout | LoginStart | LoginFail | SignupStart;
