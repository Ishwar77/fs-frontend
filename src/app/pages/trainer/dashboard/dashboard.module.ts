import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { ProfileSectionModule } from 'src/app/components/profile-section/profile-section.module';

const routes: Routes = [{ path: "", component: DashboardComponent }];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule,RouterModule.forChild(routes)],
  exports: [DashboardComponent],
})
export class DashboardModule { }
