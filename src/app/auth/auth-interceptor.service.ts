import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from "@angular/common/http";

import { Injectable } from "@angular/core";
import { AuthServiceService } from "./auth-service.service";
import { take, exhaustMap, map } from "rxjs/operators";
import { User } from "./user.mode";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthServiceService,
    private store: Store<AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //add token to url before return it
    return this.store.select("auth").pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedRequest = req.clone({
          params: new HttpParams().set("auth", user.token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
