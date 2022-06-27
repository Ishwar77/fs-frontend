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
  MatStepperModule,
} from "@angular/material";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { EventCardsModule } from '../event-card/event-card.module';
import { SliderComponentLayouts } from './subs-slider/slider.component';

const routes: Routes = [{ path: "", component: SubscriptionManageComponent }];

@NgModule({
  declarations: [
    SubscriptionManageComponent,
SliderComponentLayouts
  ],
  imports: [
    CommonModule,MatStepperModule,
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
    MatSnackBarModule,EventCardsModule,
    RouterModule.forChild(routes),
  ],
  exports: [SubscriptionManageComponent,SliderComponentLayouts]
})
export class SubscriptionManageModule {}
