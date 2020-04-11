import { Component, OnInit } from "@angular/core";
import { AuthServiceService } from "./auth/auth-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "cart-project";

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
