import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventCardComponent } from "./event-card.component";
import { MatCardModule } from "@angular/material/card";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material";
import { SharedModule } from "src/app/shared/shared.module";
import { EventsModule } from '../card/card.module';

const route: Routes = [
  {
    path: "",
    component: EventCardComponent,
  },
];

@NgModule({
  declarations: [EventCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(route),
    MatButtonModule,EventsModule,
    SharedModule,
  ],
  exports: [EventCardComponent],
})
export class EventCardModule {}
