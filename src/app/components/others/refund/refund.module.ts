import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { RefundComponent } from './refund.component';

const routes: Routes = [{ path: "", component: RefundComponent }];

@NgModule({
  declarations: [RefundComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RefundComponent]
})
export class RefundModule { }
