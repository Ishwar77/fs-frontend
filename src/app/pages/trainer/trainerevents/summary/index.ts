import { SummaryComponent } from './summary.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TrainerGuard } from "src/app/util/guards/trainerguard";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from 'src/app/shared/material-module/index.module';
import { MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: "",
    component: SummaryComponent,
    children: [
      {
        path: ":eventId/subscription",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("../../subscription-manage/subscription-manage.module").then(
            (m) => m.SubscriptionManageModule
          ),
      },
      {
        path: ":eventId/batches",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("../../batch-manage/batch-manage.module").then(
            (m) => m.BatchmanageModule
          ),
      },
      {
        path: ":eventId/coupans",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("../../coupan-manage/coupan-manage.module").then(
            (m) => m.CoupanManageModule
          ),
      },
      {
        path: ":eventId/users",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("../../user-manage/user-manage.module").then(
            (m) => m.UserManageModule
          ),
      },
      {
        path: "attendenceview/:uuid",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("../../view-atendence/view-atendence.module").then(
            (m) => m.AttendenceviewModule
          ),
      },
      {
        path: "attendence/:uuid",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("../../../../components/Attendence/attendence.module").then(
            (m) => m.UserAttendenceModule
          ),
      },
    ]
  }
];

@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FlexLayoutModule,
    MaterialModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    SummaryComponent
  ],
})
export class SummaryDashboardModule { }
