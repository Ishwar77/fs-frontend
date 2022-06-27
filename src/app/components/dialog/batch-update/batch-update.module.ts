import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchUpdateComponent } from './batch-update.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material-module/index.module';

@NgModule({
  declarations: [BatchUpdateComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [BatchUpdateComponent]
})
export class BatchUpdateModule { }