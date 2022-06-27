import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { RegisterComponent } from "../../Authentication/register/register.component";
import { Router } from "@angular/router";
import { ApplicationContext, ContextDataItem, ContextActionListencer, ContextEvents } from "src/app/util/context/applicationContext";
import { SessionService } from 'src/app/services/session';
import { LoginComponent } from '../../Authentication/login/login.component';
import * as data from "../../../../assets/data/notification.json";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  togglevalue = false;
  notificationData = [];
  username: any;
  userrole: any;
  url: any;
  notifyView = false;
  constructor(
    private dailog: MatDialog,
    private route: Router,
    private context: ApplicationContext,
    private cdref: ChangeDetectorRef,
    private sessionservice: SessionService
  ) { }

  ngOnInit() {
    if (this.context && this.context.getData(ContextDataItem.LOGGEDIN)) {
      this.togglevalue = true;
      this.username = this.context.getData(ContextDataItem.USER_NAME);
      this.url = this.context.getData(ContextDataItem.IMAGE_URL);
      this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
      this.cdref.markForCheck();
    }
    this.listedtocontext();
    this.loadNotifyJSONData();
  }

  /** Notification Sample JSON Data */
  loadNotifyJSONData() {
    this.notificationData = data['default'];
  }


  //get the image to show in header
  getImageUrl(picUrl) {
    if (picUrl) {
      const t = picUrl.split("//");
      if (t && t.length) {
        return `https://${t[1]}`;
      }
      return "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png";
    }
  }
  //listen to the context to get the values
  listedtocontext() {
    this.context.listener.subscribe((res: ContextActionListencer) => {
      if (res.event === ContextEvents.VALUDE_CHANGED) {
        this.username = this.context.getData(ContextDataItem.USER_NAME);
        this.url = this.context.getData(ContextDataItem.IMAGE_URL);
        this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
        if (res.data && res.data.key && res.data.key === ContextDataItem.LOGGEDIN) {
          this.togglevalue = true;
          this.cdref.markForCheck();
        }
      } else if (res.event && res.event === ContextEvents.CONTEXT_DESTROYED) {
        // See if login status has changed
        this.togglevalue = false;
        this.cdref.markForCheck();
      }
    });
  }
  //open the user register dialog
  onRegister() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "100%";
    dialogConfig.minWidth = "40%";
    dialogConfig.minHeight = "50vh";
    this.dailog.open(RegisterComponent, dialogConfig);
  }
  //open the login dialog
  onLogin() {
    const dialogLoginConfig = new MatDialogConfig();
    dialogLoginConfig.autoFocus = true;
    dialogLoginConfig.maxWidth = "100%";
    dialogLoginConfig.minWidth = "30%";
    dialogLoginConfig.minHeight = "50vh";
    this.dailog.open(LoginComponent, dialogLoginConfig);
  }
  //logout functionality
  onLogout() {
    const userId = this.context.getData(ContextDataItem.USER_ID);
    this.sessionservice.deletesession(userId ? userId : '').subscribe(res => {
      this.context.setData(ContextDataItem.LOGGEDIN, false); //remove the loggedin status
      window.location.reload();
    }, err => {
      this.context.setData(ContextDataItem.LOGGEDIN, false);
      window.location.reload();
    });
    window.localStorage.removeItem("TOKEN");
  }
  //route to the respective pages based on the userrole
  routetouser() {
    if (this.userrole == 1) {
      this.route.navigate([`admin`]);
    } else if (this.userrole == 3 || this.userrole == 6) {
      this.route.navigate([`dashboard`]);
    } else {
      return;
    }
  }
}
