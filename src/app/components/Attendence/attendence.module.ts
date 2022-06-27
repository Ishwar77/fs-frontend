import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "src/app/shared/material-module/index.module";
import { MainAttenddenceComponent } from "./main-attenddence/main-attenddence.component";
import { UserlistSessionComponent } from "./userlist-session/userlist-session.component";
import { MeetingSummaryComponent } from "./meeting-summary/meeting-summary.component";
import { UserPerformanceReportComponent } from "./user-performance-report/user-performance-report.component";
import { ShareDialogComponent } from "../dialog/share-dialog/share-dialog.component";
import { ShareDialogModule } from "../dialog/share-dialog/share-dialog.module";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { UserSwitchComponent } from "./user-switch/user-switch.component";
import { MatCheckboxModule } from '@angular/material';

const route: Routes = [
  {
    path: "",
    component: MainAttenddenceComponent,
  },
];

@NgModule({
  declarations: [
    MainAttenddenceComponent,
    UserlistSessionComponent,
    MeetingSummaryComponent,
    UserPerformanceReportComponent,
    UserSwitchComponent,
  ],

  imports: [
    CommonModule,
    ShareDialogModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    MatCheckboxModule,
    RouterModule.forChild(route),
  ],

  exports: [
    MainAttenddenceComponent,
    UserlistSessionComponent,
    MeetingSummaryComponent,
    UserPerformanceReportComponent,
    UserSwitchComponent
  ],
  entryComponents: [ShareDialogComponent, UserSwitchComponent],
})
export class UserAttendenceModule {}
