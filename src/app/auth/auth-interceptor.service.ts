import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from "@angular/common/http";

import { Injectable } from "@angular/core";
import { AuthServiceService } from "./auth-service.service";
import { take, exhaustMap } from "rxjs/operators";
import { User } from "./user.mode";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //add token to url before return it
    return this.authService.user.pipe(
      take(1),
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
