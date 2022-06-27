import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRpComponent } from './payment-rp.component';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { PaymentAllModule } from 'src/app/components/payment-all/payment-all.module';


const routes: Routes = [{ path: "", component: PaymentRpComponent }];
@NgModule({
  declarations: [PaymentRpComponent],
  imports: [
    CommonModule, MaterialModule, FlexLayoutModule, SharedModule, RouterModule.forChild(routes), PaymentAllModule
  ],
  exports:[PaymentRpComponent]
})
export class PaymentRpModule { }
