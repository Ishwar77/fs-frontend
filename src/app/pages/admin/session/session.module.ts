import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { SessionComponent } from './session.component';

const routes: Routes = [{ path: "", component: SessionComponent }];
@NgModule({
  declarations: [SessionComponent],
  imports: [
    CommonModule, MaterialModule, FlexLayoutModule, SharedModule, RouterModule.forChild(routes),
  ],
  exports: [SessionComponent]
})
export class SessionModule { }