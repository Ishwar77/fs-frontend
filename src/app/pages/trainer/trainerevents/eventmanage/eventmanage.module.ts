import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventmanageComponent } from "./eventmanage.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CustomModulev2 } from 'src/app/components/components-v2/index.module';
import { SliderComponentLayout } from './slider-component/slider.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material-module/index.module';

const routes: Routes = [
  {
    path: "",
    component: EventmanageComponent
  },
];

@NgModule({
  declarations: [
    EventmanageComponent,
    SliderComponentLayout
  ],
  imports: [
    CommonModule, AngularEditorModule, FlexLayoutModule, TextFieldModule,
    SharedModule, ReactiveFormsModule, CustomModulev2, FormsModule,
    MaterialModule, RouterModule.forChild(routes),
  ],
  exports: [
    EventmanageComponent,
    SliderComponentLayout
  ]
})
export class EventmanageModule { }
