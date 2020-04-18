import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthServiceService } from "./auth-service.service";
import { map, take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";

@Injectable({
  providedIn: "root",
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select("auth").pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      map((user) => {
        return user ? true : this.router.createUrlTree(["/auth"]);
      })
    );
  }
}
