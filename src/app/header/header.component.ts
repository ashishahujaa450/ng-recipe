import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthServiceService } from "../auth/auth-service.service";
import { Subscription } from "rxjs";
import { User } from "../auth/user.mode";
import { Router } from "@angular/router";

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
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user: User) => {
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
