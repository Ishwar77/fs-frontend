import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlideComponent } from './slider-module.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material-module/index.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule,
        MaterialModule
    ],
    declarations: [
        SlideComponent
    ],
    exports: [
        SlideComponent
    ]
})
export class SlideModule { }
