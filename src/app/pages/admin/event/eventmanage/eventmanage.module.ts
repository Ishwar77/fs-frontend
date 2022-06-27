import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventmanageComponent } from "./eventmanage.component";
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
import { EventDelete } from "../event-delete/event-delete";
import { SharedModule } from "src/app/shared/shared.module";
import { ExtraInfo } from '../extra-info/extra-info';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { TextFieldModule } from '@angular/cdk/text-field';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { EventAddComponent } from '../event-add/event-add.component';
import { TrainerInfo } from '../../trainer/trainer-info/trainer-info';
const routes: Routes = [{ path: "", component: EventmanageComponent }];

@NgModule({
  declarations: [
    EventmanageComponent,
    EventAddComponent,
    EventEditComponent,
    EventDelete,TrainerInfo,ExtraInfo
  ],
  imports: [
    CommonModule, AngularEditorModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    TextFieldModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
  ],
  exports: [EventmanageComponent],
  entryComponents: [EventAddComponent, EventEditComponent, EventDelete,TrainerInfo,ExtraInfo],
})
export class EventmanageModule {}
