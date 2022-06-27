import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './personal-info.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MaterialModule } from 'src/app/shared/material-module/index.module';

const route: Routes = [
  { path: '', component: GalleryComponent }
];

@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule, HttpClientModule, MaterialModule, FormsModule, ReactiveFormsModule, AngularEditorModule,
    RouterModule.forChild(route), SharedModule
  ],
  exports: [GalleryComponent]
})
export class PersonalInfoModule { }
