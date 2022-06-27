import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { LoginGuard } from "src/app/util/guards/loginguard";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: "user-manage",
        canActivate: [LoginGuard],
        loadChildren: () =>
          import("./user/user-manage/user-manage.module").then(
            (m) => m.UserManageModule
          ),
      },
      {
        path: "trainer-manage",
        canActivate: [LoginGuard],
        loadChildren: () =>
          import("./trainer/trainer-manage/trainer-manage.module").then(
            (m) => m.TrainerManageModule
          ),
      },
      {
        path: "event-manage",
        canActivate: [LoginGuard],
        loadChildren: () =>
          import("./event/eventmanage/eventmanage.module").then(
            (m) => m.EventmanageModule
          ),
      },
      {
        path: "advertise-manage",
        canActivate: [LoginGuard],
        loadChildren: () =>
        import("./advertise/advertise-main/advertise-main.module").then(
          (m) => m.AdvertiseMainModule
          ),
      },

      {
        path: "payment",
        canActivate: [LoginGuard],
        loadChildren: () =>
          import("./payment/payment-rp/payment-rp.module").then(
            (m) => m.PaymentRpModule
          ),
      },
      {
        path: "payment-manage",
        canActivate: [LoginGuard],
        loadChildren: () =>
          import("./payment/paymentmanage/paymentmanage.module").then(
            (m) => m.PaymentmanageModule
          ),
      },
      {
        path: "subscription-manage",
        //  canActivate: [LoginCheckGuard],
        loadChildren: () =>
          import("./subscription/subscription-manage/subscription-manage.module").then(
            (m) => m.SubscriptionManageModule
          ),
      },
      {
        path: "coupan-manage",
        //  canActivate: [LoginCheckGuard],
        loadChildren: () =>
          import("./coupon/coupan-manage/coupan-manage.module").then(
            (m) => m.CoupanManageModule
          ),
      },


      {
        path: "enquiry",
        //  canActivate: [LoginCheckGuard],
        loadChildren: () =>
          import("./contact/contact.module").then(
            (m) => m.ContactModule
          ),
      },

      {
        path: "user",
        //  canActivate: [LoginCheckGuard],
        loadChildren: () =>
          import("./user/user-event/user-event.module").then(
            (m) => m.UserEventModule
          ),
      },
      {
        path: "open",
        canActivate: [LoginGuard],
        loadChildren: () =>
          import("./preview/preview.module").then(
            (m) => m.PreviewModule
          ),
      },
      {
        path: "batch-manage",
        canActivate: [LoginGuard],
        loadChildren: () =>
          import("./batch/batch-manage/batch-manage.module").then(
            (m) => m.BatchmanageModule
          ),
      },
      {
        path: "profile",
        canActivate: [LoginGuard],
        loadChildren: () =>
          import("../personal-info/personal-info.module").then(
            (m) => m.PersonalInfoModule
          ),
      },
      {
        path: "session",
        canActivate: [LoginGuard],
        loadChildren: () =>
          import("../admin/session/session.module").then(
            (m) => m.SessionModule
          ),
      },
      { path: "**", redirectTo: "user-manage" },
    ],
  },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardModule, RouterModule.forChild(routes)],
  exports: [],
})
export class AdminDashboardModule { }
