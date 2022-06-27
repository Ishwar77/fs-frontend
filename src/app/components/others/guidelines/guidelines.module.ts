import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { GuidelinesComponent } from './guidelines.component';

const routes: Routes = [{ path: "", component: GuidelinesComponent }];

@NgModule({
  declarations: [GuidelinesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [GuidelinesComponent]
})
export class GuidelinestrainerModule { }
