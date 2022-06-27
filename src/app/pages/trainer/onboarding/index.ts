import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppTrainerOnboardingComponent } from './component';

// const route: Routes = [
//     {
//         path: '', component: AppTrainerOnboardingComponent
//     }
// ]

const assets = [
    AppTrainerOnboardingComponent
];


@NgModule({
    declarations: [assets],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [assets]
})
export class AppTrainerOnboardingModule { }