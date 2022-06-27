import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { TrainerGuard } from "src/app/util/guards/trainerguard";
import { FlexLayoutModule } from "@angular/flex-layout";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      // {
      //   path: "summary",
      //   canActivate: [TrainerGuard],
      //   loadChildren: () =>
      //     import("./summary/index").then((m) => m.SummaryDashboardModule),
      // },
      {
        path: "user-manage",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("./user-manage/user-manage.module").then(
            (m) => m.UserManageModule
          ),
      },
      // {
      //   path: "event-manage",
      //   canActivate: [TrainerGuard],
      //   loadChildren: () =>
      //     import("./eventmanage/eventmanage.module").then(
      //       (m) => m.EventmanageModule
      //     ),
      // },
      {
        path: "coupan-manage",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("./coupan-manage/coupan-manage.module").then(
            (m) => m.CoupanManageModule
          ),
      },
      {
        path: "open",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("./preview/preview.module").then((m) => m.PreviewModules),
      },
      {
        path: "batch-manage",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("./batch-manage/batch-manage.module").then(
            (m) => m.BatchmanageModule
          ),
      },
      {
        path: "attendenceview/:uuid",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("./view-atendence/view-atendence.module").then(
            (m) => m.AttendenceviewModule
          ),
      },
      {
        path: "attendence/:uuid",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("../../components/Attendence/attendence.module").then(
            (m) => m.UserAttendenceModule
          ),
      },
      {
        path: "onboarding",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("./onboarding/index").then(
            (m) => m.AppTrainerOnboardingModule
          ),
      },
      {
        path: "profile",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("../personal-info/personal-info.module").then((m) => m.PersonalInfoModule),
      },
      {
        path: "rewards",
        canActivate: [TrainerGuard],
        loadChildren: () =>
          import("./rewards/rewards.module").then((m) => m.RewardsModule),
      },
      { path: "**", redirectTo: "user-manage" },
    ],
  },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class TrainerDashboardModule { }
