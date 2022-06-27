import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import {
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
} from "@angular/material";
import { SharedModule } from "src/app/shared/shared.module";
import { PreviewComponent } from './preview.component';
import { CustomModulev2 } from 'src/app/components/components-v2/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [PreviewComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CustomModulev2,
    FlexLayoutModule,SharedModule,
    RouterModule,
    SharedModule,
  ],
  exports: [PreviewComponent]
})
export class PreviewModules { }
