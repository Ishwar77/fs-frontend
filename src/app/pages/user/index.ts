import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserDashboardComponent } from './user-dash/dashboard.component';
import { UserDashboardModule } from './user-dash/dashboard.module';
import { UserGuard } from 'src/app/util/guards/userguard';

const routes: Routes = [
  {
    path: "",
    component: UserDashboardComponent,
    children: [
      {
        path: "main",
        canActivate: [UserGuard],
        loadChildren: () =>
          import("./main/preview.module").then(
            (m) => m.PreviewModule
          ),
      },
      {
        path: "profile",
        canActivate: [UserGuard],
        loadChildren: () =>
          import("../personal-info/personal-info.module").then(
            (m) => m.PersonalInfoModule
          ),
      },
      {
        path: "myevents",
        canActivate: [UserGuard],
        loadChildren: () =>
          import("../eventlist/eventlist.module").then(
            (m) => m.EventlistModule
          ),
      },
      {
        path: "rewards",
        canActivate: [UserGuard],
        loadChildren: () =>
          import("../trainer/rewards/rewards.module").then(
            (m) => m.RewardsModule
          ),
      },
      { path: "**", redirectTo: "main" },
    ],
  },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserDashboardModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)],
  exports: [],
})
export class UserMainDashboardModule { }
