import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "src/app/shared/material-module/index.module";
import { ShareDialogModule } from '../../../components/dialog/share-dialog/share-dialog.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ViewAtendenceComponent } from './view-atendence.component';

const route: Routes = [
    {
        path: '', component: ViewAtendenceComponent
    }
]

@NgModule({
    declarations: [
        ViewAtendenceComponent
    ],
    imports: [CommonModule, ShareDialogModule, FlexLayoutModule, MaterialModule, FormsModule,
        SharedModule, RouterModule.forChild(route)],
    exports: [
        ViewAtendenceComponent
    ]
})
export class AttendenceviewModule { }