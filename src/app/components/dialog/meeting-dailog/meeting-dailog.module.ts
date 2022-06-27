import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingDailogComponent } from './meeting-dailog.component';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MeetingDailogComponent],
  imports: [
    CommonModule, MaterialModule, FlexLayoutModule, FormsModule
  ],
  exports: [MeetingDailogComponent]
})
export class MeetingDailogModule { }