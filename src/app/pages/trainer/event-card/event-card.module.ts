import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventCardComponent } from "./event-card.component";
import { MatCardModule } from "@angular/material/card";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule, MatTooltipModule } from "@angular/material";


@NgModule({
  declarations: [EventCardComponent],
  imports: [
    CommonModule,
    MatCardModule,MatTooltipModule,
    MatButtonModule
  ],
  exports: [EventCardComponent],
})
export class EventCardsModule {}
