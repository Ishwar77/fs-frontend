import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile/profile.component";
import { MaterialModule } from "src/app/shared/material-module/index.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { EventlistModule } from "src/app/pages/eventlist/eventlist.module";
import { SharedModule } from "src/app/shared/shared.module";
import { PersonalInfoComponent } from "./personal-info/personal-info.component";
import { BmiInfoComponent } from "./bmi-info/bmi-info.component";
import { SettingComponent } from "./setting/setting.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { PreviewModule } from 'src/app/pages/user/main/preview.module';
import { RewardsprofileComponent } from './rewards/rewards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserReviewComponent } from './user-review/user-review.component';
import { PreviewModules } from 'src/app/pages/trainer/preview/preview.module';
import { AppTrainerOnboardingModule } from 'src/app/pages/trainer/onboarding';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { TrainerBatchComponent } from './trainer-batch/trainer-batch.component';
import { UserListComponent } from './user-list/user-list.component';
import { ShareDialogComponent } from '../dialog/share-dialog/share-dialog.component';
import { ShareDialogModule } from '../dialog/share-dialog/share-dialog.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AdvertisePostComponent } from '../advertise/advertise-post/advertise-post.component';
import { AdvertiseModule } from '../advertise/advertise.module';
import { EventlistReedeemComponent } from './eventlist-reedeem/eventlist-reedeem.component';
import { EventlistReedeemModule } from './eventlist-reedeem/eventlist-reedeem.module';
import { ReedeemHistoryComponent } from './reedeemHistory/reedeem-history.component';
import { CoupanRedemComponent } from '../dialog/coupan-redem/coupan-redem.component';
import { CoupanRedemModule } from '../dialog/coupan-redem/coupan-redem.module';

const route: Routes = [
  {
    path: '', component: ProfileComponent
  }
]

@NgModule({
  declarations: [
    ProfileComponent, ReedeemHistoryComponent,
    PersonalInfoComponent,
    BmiInfoComponent, UserListComponent,
    SettingComponent, PaymentHistoryComponent, TrainerBatchComponent,
    ChangePasswordComponent, RewardsprofileComponent, UserReviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule, ShareDialogModule, CoupanRedemModule,
    FlexLayoutModule, PreviewModules, AdvertiseModule,
    EventlistModule, FormsModule, AngularEditorModule, EventlistReedeemModule,
    RouterModule.forChild(route),
    SharedModule, PreviewModule, AppTrainerOnboardingModule
  ],
  exports: [
    ProfileComponent, UserListComponent, AdvertiseModule, ReedeemHistoryComponent,
    BmiInfoComponent, PaymentHistoryComponent, TrainerBatchComponent,
    SettingComponent, RewardsprofileComponent, UserReviewComponent
  ],
  entryComponents: [
    PersonalInfoComponent,
    CoupanRedemComponent, ShareDialogComponent, AdvertisePostComponent, EventlistReedeemComponent
  ]
})
export class ProfileSectionModule { }
