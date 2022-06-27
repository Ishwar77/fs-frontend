import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { HomePageModule } from "./pages/home-page/home-page.module";
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [HomePageModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  // providers: [
  //   { provide: APP_BASE_HREF, useValue: '!' }
  // ]
})
export class AppRoutingModule {}
