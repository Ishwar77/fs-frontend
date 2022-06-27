import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RatingDialogComponent } from './rating-dialog.component';

@NgModule({
  declarations: [RatingDialogComponent],
  imports: [
    CommonModule, MaterialModule, FlexLayoutModule, FormsModule
  ],
  exports: [RatingDialogComponent]
})
export class RatingDialogModule { }
