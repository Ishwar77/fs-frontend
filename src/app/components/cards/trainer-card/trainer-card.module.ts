import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material";
import { SharedModule } from "src/app/shared/shared.module";
import { TrainerCardComponent } from './trainer-card.component';
import { EventsModule } from '../card/card.module';

const route: Routes = [
  {
    path: "",
    component: TrainerCardComponent,
  },
];

@NgModule({
  declarations: [TrainerCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(route),
    MatButtonModule,EventsModule,
    SharedModule,
  ],
  exports: [TrainerCardComponent],
})
export class TrainerCardModule { }