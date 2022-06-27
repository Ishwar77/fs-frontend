import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerManageComponent } from './trainer-manage.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatTabsModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  { path: '', component: TrainerManageComponent }
];


@NgModule({
  declarations: [TrainerManageComponent],
  imports: [

    CommonModule,SharedModule,MatTabsModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    TrainerManageComponent
  ],
})
export class TrainerManageModule { }
