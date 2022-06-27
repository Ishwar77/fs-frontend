import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { MatIconModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [{ path: "", component: DashboardComponent }];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule,MatIconModule,  FlexLayoutModule, MatButtonModule, RouterModule.forChild(routes)],
  exports: [DashboardComponent],
})
export class DashboardModule {}
