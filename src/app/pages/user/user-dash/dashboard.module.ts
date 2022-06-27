import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes, RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserDashboardComponent } from './dashboard.component';
import { MatButtonModule, MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { ProfileSectionModule } from 'src/app/components/profile-section/profile-section.module';

const routes: Routes = [{ path: "", component: UserDashboardComponent }];

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [CommonModule, FlexLayoutModule, ProfileSectionModule, MatButtonModule, MatSidenavModule, 
    MatListModule, MatIconModule, MatToolbarModule, RouterModule.forChild(routes)],
  exports: [UserDashboardComponent],
})
export class UserDashboardModule { }
