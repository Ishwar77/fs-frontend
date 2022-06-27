import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiseMasterComponent } from './advertise-master.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdvertiseMasterComponent],
  imports: [
    CommonModule, FlexLayoutModule, MaterialModule, FormsModule
  ],
  exports: [AdvertiseMasterComponent]
})
export class AdvertiseMasterModule { }
