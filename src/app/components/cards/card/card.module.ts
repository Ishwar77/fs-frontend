import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventsComponent } from "./card.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [EventsComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, RouterModule, SharedModule],
  exports: [EventsComponent],
})
export class EventsModule { }