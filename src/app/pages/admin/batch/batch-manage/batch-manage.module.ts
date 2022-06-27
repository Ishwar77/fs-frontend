import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MatTableModule,MatPaginatorModule,MatFormFieldModule,MatInputModule,MatButtonModule,
  MatDialogModule,MatSelectModule,MatSnackBarModule, MatSlideToggleModule} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { BatchmanageComponent } from './batch-manage.component';
import { BatchAddComponent } from '../batch-add/batch-add.component';
import { BatchEditComponent } from '../batch-edit/batch-edit.component';

const routes: Routes = [{ path: "", component: BatchmanageComponent }];

@NgModule({
  declarations: [
    BatchmanageComponent,
    BatchAddComponent,
    BatchEditComponent,
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
  ],
  exports: [BatchmanageComponent],
  bootstrap: [
    BatchAddComponent, 
    BatchEditComponent
  ],
})
export class BatchmanageModule {}
