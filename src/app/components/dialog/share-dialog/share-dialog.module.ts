import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareDialogComponent } from './share-dialog.component';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShareDialogComponent],
  imports: [
    CommonModule, MaterialModule, FlexLayoutModule, FormsModule
  ],
  exports: [ShareDialogComponent]
})
export class ShareDialogModule { }
