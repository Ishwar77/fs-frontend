import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserEventComponent } from './user-event.component';
import { MaterialModule } from 'src/app/shared/material-module/index.module';

const routes: Routes = [
  { path: '', component: UserEventComponent }
];



@NgModule({
  declarations: [UserEventComponent],
  imports: [
    CommonModule, SharedModule, MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [UserEventComponent]
})
export class UserEventModule { }
