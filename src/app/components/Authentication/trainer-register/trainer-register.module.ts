import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerRegisterComponent } from './trainer-register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material-module/index.module';

const route: Routes = [{ path: "", component: TrainerRegisterComponent }];

@NgModule({
  declarations: [TrainerRegisterComponent],
  imports: [
    CommonModule, FlexLayoutModule, ReactiveFormsModule, MaterialModule, FormsModule, SharedModule,
    RouterModule.forChild(route),
  ],
  exports: [TrainerRegisterComponent]

})
export class TrainerRegisterModule { }
