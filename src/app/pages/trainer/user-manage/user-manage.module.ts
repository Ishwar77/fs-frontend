import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManageComponent } from './user-manage.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomModulev2 } from 'src/app/components/components-v2/index.module';

const routes: Routes = [
  { path: '', component: UserManageComponent }
];
@NgModule({
  declarations: [UserManageComponent],
  imports: [
    CommonModule,SharedModule,
    MatTableModule, MatPaginatorModule,CustomModulev2, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule,
    RouterModule.forChild(routes)
  ],
  exports: [UserManageComponent]
})
export class UserManageModule { }