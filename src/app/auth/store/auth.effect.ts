import { Injectable } from "@angular/core";

import { Actions, ofType, Effect } from "@ngrx/effects";
import * as fromAuthActions from "./auth.action";
import { switchMap, catchError, tap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AuthResponse } from "../auth.model";
import { of } from "rxjs";
import { Router } from "@angular/router";

const handleAuth = (resData: AuthResponse) => {
  const expireTime = new Date(new Date().getTime() + +resData.expiresIn * 1000);

  return new fromAuthActions.Login({
    email: resData.email,
    userid: resData.localId,
    token: resData.idToken,
    tokenExpiration: expireTime,
  });
};

const handleError = (errorResponse) => {
  let error = "An unknown error occured!";
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new fromAuthActions.LoginFail(error));
  }

  switch (errorResponse.error.error.message) {
    case "EMAIL_EXISTS":
      error = "Email already Exists, Please try a new one!";
      break;

    case "OPERATION_NOT_ALLOWED":
      error = "This operation is not allowed!";
      break;

    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      error =
        "We have blocked all requests from this device due to unusual activity. Try again later";
      break;

    case "EMAIL_NOT_FOUND":
      error =
        "There is no user record corresponding to this identifier. The user may have been deleted.";
      break;

    case "INVALID_PASSWORD":
      error = "The password is invalid or the user does not have a password.";
      break;

    default:
      error = "An Unkown error occured, Please try again later!";
  }
  return of(new fromAuthActions.LoginFail(error));
};

@Injectable()
export class AuthEffect {
  private signUpUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  private baseKey: string = "AIzaSyD7o_4x0Z7iAiW2F9c59cXbUXN2E7d-HKs";
  private loginUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(fromAuthActions.SIGNUP_START),
    switchMap((signupAction: fromAuthActions.SignupStart) => {
      return this.http
        .post<AuthResponse>(
          `${this.signUpUrl}${this.baseKey}`,
          signupAction.payload
        )
        .pipe(
          map((resData: AuthResponse) => {
            return handleAuth(resData);
          }),
          catchError((errorResponse) => {
            return handleError(errorResponse);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(fromAuthActions.LOGIN_START),
    switchMap((authData: fromAuthActions.LoginStart) => {
      return this.http
        .post<AuthResponse>(`${this.loginUrl}${this.baseKey}`, authData.payload)
        .pipe(
          map((resData: AuthResponse) => {
            return handleAuth(resData);
          }),
          catchError((errorResponse) => {
            return handleError(errorResponse);
          })
        );
    })
  );

  @Effect({
    dispatch: false,
  })
  authLoginSuccess = this.actions$.pipe(
    ofType(fromAuthActions.LOGIN),
    tap(() => {
      //navigate on success loggin
      this.router.navigate(["/"]);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
