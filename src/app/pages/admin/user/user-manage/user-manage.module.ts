import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManageComponent } from './user-manage.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material-module/index.module';

const routes: Routes = [
  { path: '', component: UserManageComponent }
];

@NgModule({
  declarations: [UserManageComponent],
  imports: [CommonModule, SharedModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [UserManageComponent]
})
export class UserManageModule { }
