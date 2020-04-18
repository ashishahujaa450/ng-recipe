import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthInterceptor } from "./auth/auth-interceptor.service";
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { AppReducer } from "./store/app.reducer";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(AppReducer),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
