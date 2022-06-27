import { SharedModule } from "./shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderModule } from "./components/layouts/header/header.module";
import { FooterModule } from "./components/layouts/footer/footer.module";
import { PagesModules } from "./pages/pages.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./services/tokenInjector";
import { HomeNewPageModules } from './components/home-page/home-page.module';
import { MaterialModule } from './shared/material-module/index.module';
import { CoupanRedemComponent } from './components/dialog/coupan-redem/coupan-redem.component';
import { ClientReviewModule } from './components/client-review/client-review.module';
import { AdvertiseModule } from './components/advertise/advertise.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    PagesModules,
    HomeNewPageModules, HttpClientModule,
    AppRoutingModule,
    ClientReviewModule,
    AdvertiseModule,
    HeaderModule,
    FooterModule,
    MaterialModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class AppModule { }
