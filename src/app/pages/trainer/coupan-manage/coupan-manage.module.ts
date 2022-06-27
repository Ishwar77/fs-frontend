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
import { CustomModulev2 } from 'src/app/components/components-v2/index.module';
import { SliderComponentLayouts } from './subs-slider/slider.component';
const routes: Routes = [{ path: "", component: CoupanManageComponent }];

@NgModule({
  declarations: [
    CoupanManageComponent,
SliderComponentLayouts
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
    MatSnackBarModule,CustomModulev2,
    RouterModule.forChild(routes),
  ],
  exports: [CoupanManageComponent,SliderComponentLayouts]
})
export class CoupanManageModule {}
