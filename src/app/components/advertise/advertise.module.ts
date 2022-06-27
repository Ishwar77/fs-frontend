import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisePostComponent } from './advertise-post/advertise-post.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BannerComponent } from './banner/banner.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AdvertisePostComponent,
    BannerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    AngularEditorModule,
  ],
  exports: [AdvertisePostComponent,
    BannerComponent]

})
export class AdvertiseModule { }
