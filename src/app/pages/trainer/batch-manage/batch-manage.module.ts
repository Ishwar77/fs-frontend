import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import {
  MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatButtonModule,
  MatDialogModule, MatSelectModule, MatSnackBarModule, MatSlideToggleModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { BatchmanageComponent } from './batch-manage.component';
import { CustomModulev2 } from 'src/app/components/components-v2/index.module';
import { SliderComponentLayouts } from './subs-slider/slider.component';
import { MeetingDailogModule } from 'src/app/components/dialog/meeting-dailog/meeting-dailog.module';
import { MeetingDailogComponent } from 'src/app/components/dialog/meeting-dailog/meeting-dailog.component';

const routes: Routes = [{
  path: "", component: BatchmanageComponent
}];

@NgModule({
  declarations: [
    BatchmanageComponent,
    SliderComponentLayouts
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule, CustomModulev2,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MeetingDailogModule,

    RouterModule.forChild(routes),
  ],
  exports: [BatchmanageComponent, SliderComponentLayouts],
  entryComponents: [MeetingDailogComponent]
})
export class BatchmanageModule { }
