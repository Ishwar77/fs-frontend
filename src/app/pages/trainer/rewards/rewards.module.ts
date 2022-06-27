import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { RewardsComponent } from './rewards.component';
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

 const routes: Routes = [{ path: "", component: RewardsComponent }];

@NgModule({
    declarations: [
        RewardsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,SharedModule,
        FlexLayoutModule,RouterModule.forChild(routes)
    ],
    exports: [RewardsComponent],
})
export class RewardsModule { }
