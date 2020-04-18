import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthServiceService } from "../auth/auth-service.service";
import { Subscription } from "rxjs";
import { User } from "../auth/user.mode";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { map } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthnticated: boolean = false;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthServiceService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select("auth")
      .pipe(
        map((authData) => {
          return authData.user;
        })
      )
      .subscribe((user: User) => {
        this.isAuthnticated = user ? true : false;
      });
  }

  onLogOut() {
    this.authService.logout();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipe().subscribe((response) => {
      //data successfully fetched
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
