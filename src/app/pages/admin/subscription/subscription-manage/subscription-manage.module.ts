import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubscriptionManageComponent } from "./subscription-manage.component";
import { Routes, RouterModule } from "@angular/router";
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
import { SharedModule } from "src/app/shared/shared.module";
import { SubscriptionAddComponent } from "../subscription-add/subscription-add.component";
import { SubscriptionEditComponent } from "../edit-subscription/edit-subscription.component";

const routes: Routes = [{ path: "", component: SubscriptionManageComponent }];

@NgModule({
  declarations: [
    SubscriptionManageComponent,
    SubscriptionAddComponent,
    SubscriptionEditComponent,
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
  exports: [SubscriptionManageComponent],
  bootstrap: [SubscriptionAddComponent, SubscriptionEditComponent],
})
export class SubscriptionManageModule {}
