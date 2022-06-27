import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { TermsandConditionsComponent } from './t&c.component';

const routes: Routes = [{ path: "", component: TermsandConditionsComponent }];

@NgModule({
  declarations: [
    TermsandConditionsComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes),
  ],
  exports: [TermsandConditionsComponent]
})
export class TermsandConditionsModule {}
