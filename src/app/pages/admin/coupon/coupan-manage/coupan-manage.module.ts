import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoupanManageComponent } from "./coupan-manage.component";
import {
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule,
} from "@angular/material";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { CouponAddComponent } from "../coupon-add/coupon-add.component";
import { CouponEditComponent } from "../edit-coupon/edit-coupon.component";
const routes: Routes = [{ path: "", component: CoupanManageComponent }];

@NgModule({
  declarations: [
    CoupanManageComponent,
    CouponAddComponent,
    CouponEditComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
  ],
  exports: [CoupanManageComponent],
  bootstrap: [CouponAddComponent, CouponEditComponent],
})
export class CoupanManageModule {}
