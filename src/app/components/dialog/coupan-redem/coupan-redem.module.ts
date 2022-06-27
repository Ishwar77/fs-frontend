import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoupanRedemComponent } from './coupan-redem.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CoupanRedemComponent],
  imports: [
    CommonModule, FlexLayoutModule, MaterialModule, FormsModule
  ],
  exports: [CoupanRedemComponent]
})
export class CoupanRedemModule { }
