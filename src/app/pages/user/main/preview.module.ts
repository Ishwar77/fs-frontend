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
import { CustomModulev2 } from 'src/app/components/components-v2/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PreviewComponent } from './preview-component';
import { MeetingDailogComponent } from 'src/app/components/dialog/meeting-dailog/meeting-dailog.component';
import { MeetingDailogModule } from 'src/app/components/dialog/meeting-dailog/meeting-dailog.module';

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
    FlexLayoutModule, SharedModule,
    RouterModule,
    SharedModule, MeetingDailogModule
  ],
  exports: [PreviewComponent],
  entryComponents: [MeetingDailogComponent]
})
export class PreviewModule { }
