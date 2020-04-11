import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { SignUp, AuthResponse } from "./auth.model";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.mode";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private signUpUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  private baseKey: string = "AIzaSyD7o_4x0Z7iAiW2F9c59cXbUXN2E7d-HKs";
  private loginUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  public user = new BehaviorSubject<User>(null);

  private expirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  private commonError(errorResponse: HttpErrorResponse) {
    let error = "An unknown error occured!";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(error);
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

    return throwError(error);
  }

  public login(data: SignUp) {
    return this.http
      .post<AuthResponse>(`${this.loginUrl}${this.baseKey}`, data)
      .pipe(
        catchError((errorResponse) => {
          return this.commonError(errorResponse);
        }),
        tap((responseData) => {
          this.handleAuth(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  public autoLogin() {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      const loadedUser: User = new User(
        user.email,
        user.id,
        user._token,
        new Date(user._tokenExpiration)
      );

      if (loadedUser.token) {
        this.user.next(user);

        const expirationTime =
          new Date(user._tokenExpiration).getTime() - new Date().getTime();
        this.autoLogout(expirationTime);
      }
    } else {
      return;
    }
  }

  public logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");

    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
  }

  autoLogout(expirationTimer: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTimer);
  }

  private handleAuth(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expireTime = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expireTime);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  public signUp(data: SignUp) {
    return this.http
      .post<AuthResponse>(`${this.signUpUrl}${this.baseKey}`, data)
      .pipe(
        catchError((errorResponse) => {
          return this.commonError(errorResponse);
        }),
        tap((responseData) => {
          this.handleAuth(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }
}
