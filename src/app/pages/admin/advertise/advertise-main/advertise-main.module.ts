import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiseMainComponent } from './advertise-main.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { AdvertiseMasterModule } from '../advertise-master/advertise-master.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdvertiseMasterComponent } from '../advertise-master/advertise-master.component';
import { AdvertiseDeleteComponent } from '../advertise-delete/advertise-delete.component';

const routes: Routes = [
  { path: '', component: AdvertiseMainComponent }
];

@NgModule({
  declarations: [AdvertiseMainComponent, AdvertiseDeleteComponent],
  imports: [
    CommonModule,FlexLayoutModule,
     MaterialModule, AdvertiseMasterModule, SharedModule, RouterModule.forChild(routes),
  ],
  exports:[AdvertiseMainComponent],
  entryComponents:[AdvertiseMasterComponent, AdvertiseDeleteComponent]
})
export class AdvertiseMainModule { }
