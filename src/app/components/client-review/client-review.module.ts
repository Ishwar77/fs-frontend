import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientReviewComponent } from './client-review.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ClientReviewComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [ClientReviewComponent]
})
export class ClientReviewModule { }
