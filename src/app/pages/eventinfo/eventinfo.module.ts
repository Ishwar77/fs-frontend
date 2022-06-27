import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { EventinfoComponent } from "./eventinfo.component";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ShareDialogComponent } from 'src/app/components/dialog/share-dialog/share-dialog.component';
import { ShareDialogModule } from 'src/app/components/dialog/share-dialog/share-dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material-module/index.module';

const route: Routes = [{ path: "", component: EventinfoComponent }];

@NgModule({
  declarations: [EventinfoComponent],
  imports: [
    RouterModule.forChild(route),
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShareDialogModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [EventinfoComponent],
  entryComponents: [ShareDialogComponent]
})
export class EventinfoModule { }
