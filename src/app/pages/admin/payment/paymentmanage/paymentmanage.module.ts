import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentmanageComponent } from "./paymentmanage.component";
import { Routes, RouterModule } from "@angular/router";
import {
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
} from "@angular/material";
import { UserInfo } from "../../user/user-info/user-info";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [{ path: "", component: PaymentmanageComponent }];

@NgModule({
  declarations: [PaymentmanageComponent, 
    UserInfo
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [PaymentmanageComponent],
  bootstrap: [UserInfo],
})
export class PaymentmanageModule {}
