import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentAllComponent } from './payment-all.component';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [PaymentAllComponent],
  imports: [
    CommonModule, FlexLayoutModule, MaterialModule
  ],
  exports:[PaymentAllComponent]
})
export class PaymentAllModule { }
