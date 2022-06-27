import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AboutusComponent } from "./aboutus.component";

const route: Routes = [
  { path: '', component: AboutusComponent }
];

@NgModule({
  declarations: [AboutusComponent],
  imports: [CommonModule, FlexLayoutModule,  RouterModule.forChild(route)],
  exports: [AboutusComponent],
})
export class AboutusModule {}
