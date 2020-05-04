import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { AuthServiceService } from "./auth-service.service";
import { SignUp, AuthResponse } from "./auth.model";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";

import * as FromAuthActions from "./store/auth.action";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  public isLoginMode: boolean = true;
  public isLoading: boolean = false;
  public error: string = null;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select("auth").subscribe((authState) => {
      this.isLoading = authState.loading;

      if (authState.authError) {
        this.error = authState.authError;
      }
    });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.form.valid) {
      return;
    }
    const data: SignUp = {
      email: form.form.value.email,
      password: form.form.value.password,
    };

    //lading true
    this.isLoading = true;

    //login or signup check
    if (this.isLoginMode) {
      //lets login
      data.returnSecureToken = true;
      // this.authObservable = this.authService.login(data);
      this.store.dispatch(new FromAuthActions.LoginStart(data));
    } else {
      //lets signup
      data.returnSecureToken = true;
      // this.authObservable = this.authService.signUp(data);
      this.store.dispatch(new FromAuthActions.SignupStart(data));
    }

    //subscribe to obsverable
    // this.authObservable.subscribe(
    //   (response: AuthResponse) => {
    //     this.isLoading = false;
    //     this.router.navigate(["/recipes"]);
    //   },
    //   (errorMessage) => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );

    //reset form
    form.form.reset();
  }
}
