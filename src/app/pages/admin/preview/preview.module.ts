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

const routes: Routes = [{ path: "", component: PreviewComponent }];

@NgModule({
  declarations: [PreviewComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,SharedModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [PreviewComponent]
})
export class PreviewModule {}
