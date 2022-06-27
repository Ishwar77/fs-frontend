import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { LoginGuard } from "../util/guards/loginguard";
import { TrainerGuard } from '../util/guards/trainerguard';
import { UserGuard } from '../util/guards/userguard';
import { AdvertiseDeleteComponent } from './admin/advertise/advertise-delete/advertise-delete.component';

/**
 * All feature modules are dynamically loaded from here
 */

const childRoutes: Routes = [
  {
    path: "admin",
    canActivate: [LoginGuard],
    loadChildren: () =>
      import("./admin/index").then((m) => m.AdminDashboardModule),
  },
  {
    path: "trainer",
    canActivate: [TrainerGuard],
    loadChildren: () =>
      import("./trainer/index").then((m) => m.TrainerDashboardModule),
  },
  {
    path: "user",
    canActivate: [UserGuard],
    loadChildren: () =>
      import("./user/index").then((m) => m.UserMainDashboardModule),
  },
  {
    path: "trainer-register",
    loadChildren: () =>
      import("../components/Authentication/trainer-register/trainer-register.module").then((m) => m.TrainerRegisterModule),
  },
  {
    path: "ContactUs",
    loadChildren: () =>
      import("../components/others/contactus/contactus.module").then(
        (m) => m.ContactusModule
      ),
  },
  {
    path: "AboutUs",
    loadChildren: () =>
      import("../components/others/aboutus/aboutus.module").then(
        (m) => m.AboutusModule
      ),
  },
  {
    path: "Privacy",
    loadChildren: () =>
      import("../components/others/privacy/privacy.module").then(
        (m) => m.PrivacyModule
      ),
  },
  {
    path: "Refund",
    loadChildren: () =>
      import("../components/others/refund/refund.module").then(
        (m) => m.RefundModule
      ),
  },
  //new
  {
    path: "myevents",
    canActivate: [TrainerGuard],
    loadChildren: () =>
      import("../pages/trainer/trainerevents/index").then(
        (m) => m.EventDashboardModule
      ),
  },
  {
    path: "summary",
    canActivate: [TrainerGuard],
    loadChildren: () =>
      import("../pages/trainer/trainerevents/summary").then(
        (m) => m.SummaryDashboardModule
      ),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../components/profile-section/profile-section.module").then(
        (m) => m.ProfileSectionModule
      ),
  },
  //upto
  {
    path: "events",
    loadChildren: () =>
      import("../components/cards/event-card/event-card.module").then(
        (m) => m.EventCardModule
      ),
  },
  {
    path: "event/:eventId",
    loadChildren: () =>
      import("../pages/eventinfo/eventinfo.module").then(
        (m) => m.EventinfoModule
      ),
  },
  {
    path: "reset",
    loadChildren: () =>
      import("../components/Authentication/reset-password/reset-password.module").then(
        (m) => m.ResetPasswordModule
      ),
  },
  {
    path: "coach",
    loadChildren: () =>
      import("../components/cards/trainer-card/trainer-card.module").then(
        (m) => m.TrainerCardModule
      ),
  },

  {
    path: "eventlist",
    loadChildren: () =>
      import("../pages/eventlist/eventlist.module").then(
        (m) => m.EventlistModule
      ),
  },
  {
    path: "trainerguidelines",
    loadChildren: () =>
      import("../components/others/guidelines/guidelines.module").then(
        (m) => m.GuidelinestrainerModule
      ),
  },
  {
    path: "termsandconditions",
    loadChildren: () =>
      import("../components/others/t&c/t&c.module").then(
        (m) => m.TermsandConditionsModule
      ),
  },
  {
    path: "coach/:name",
    loadChildren: () =>
      import("../pages/trainer-public/trainer-public.module").then(m => m.TrainerPublicModule)
  },

  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(childRoutes)],
  declarations: [],
  exports: [],
})
export class PagesModules { }
