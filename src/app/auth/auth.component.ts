import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { AuthServiceService } from "./auth-service.service";
import { SignUp, AuthResponse } from "./auth.model";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  public isLoginMode: boolean = true;
  public isLoading: boolean = false;
  public error: string = null;

  private authObservable: Observable<AuthResponse>;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {}

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
      this.authObservable = this.authService.login(data);
    } else {
      //lets signup
      data.returnSecureToken = true;
      this.authObservable = this.authService.signUp(data);
    }

    //subscribe to obsverable
    this.authObservable.subscribe(
      (response: AuthResponse) => {
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    //reset form
    form.form.reset();
  }
}
