import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventlistComponent } from "./eventlist.component";
import { Routes, RouterModule } from "@angular/router";
import {
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
} from "@angular/material";
import { SharedModule } from "src/app/shared/shared.module";
import { CardssComponent } from './card/card.component';
import { BatchUpdateComponent } from 'src/app/components/dialog/batch-update/batch-update.component';
import { BatchUpdateModule } from 'src/app/components/dialog/batch-update/batch-update.module';

// const route: Routes = [{ path: "", component: EventlistComponent }];

@NgModule({
  declarations: [EventlistComponent,CardssComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    SharedModule,
    RouterModule,
    BatchUpdateModule
  ],
  exports: [EventlistComponent,CardssComponent],
  entryComponents:[BatchUpdateComponent]
})
export class EventlistModule {}
