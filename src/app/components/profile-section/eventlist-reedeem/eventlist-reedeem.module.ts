import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventlistReedeemComponent } from './eventlist-reedeem.component';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [EventlistReedeemComponent],
  imports: [
    CommonModule, MaterialModule, FlexLayoutModule
  ],
  exports:[EventlistReedeemComponent]
})
export class EventlistReedeemModule { }
