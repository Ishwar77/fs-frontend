import { Routes, RouterModule } from "@angular/router";
import { TrainerPublicComponent } from './trainer-public.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutTrainerComponent } from './about-trainer/about-trainer.component';
import { EventTrainerComponent } from './event-trainer/event-trainer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrainerBatchesComponent } from './batches-trainer/batches-trainer.component';
import { ShareDialogComponent } from 'src/app/components/dialog/share-dialog/share-dialog.component';
import { ShareDialogModule } from 'src/app/components/dialog/share-dialog/share-dialog.module';
import { RatingDialogComponent } from 'src/app/components/dialog/rating-dialog/rating-dialog.component';
import { RatingDialogModule } from 'src/app/components/dialog/rating-dialog/rating-dialog.module';

const route: Routes = [
    {
        path: '',
        component: TrainerPublicComponent
    }
]
@NgModule({
    declarations: [TrainerPublicComponent, AboutTrainerComponent, EventTrainerComponent, TrainerBatchesComponent],
    imports: [
        CommonModule, MaterialModule, FlexLayoutModule, FormsModule, SharedModule, ShareDialogModule,
        ReactiveFormsModule, RouterModule.forChild(route), RatingDialogModule
    ],
    exports: [TrainerPublicComponent],
    entryComponents: [ShareDialogComponent, RatingDialogComponent]
})
export class TrainerPublicModule { }