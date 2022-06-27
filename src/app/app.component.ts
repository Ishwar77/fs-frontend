import { ApplicationContext, ContextDataItem } from "src/app/util/context/applicationContext";
import { debounceTime } from "rxjs/operators";
import { LoginService } from "src/app/services/login";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './services/profile';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  menus: any = [];
  showrouter: boolean = false;
  constructor(
    private loginService: LoginService,
    private context: ApplicationContext,
    private http: HttpClient,
    private profileservice: ProfileService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // NOTE: Start the application with Guest sessions, Single entry mode
    this.context.destroySession();    // 1. Clean the context data
    this.settingthetoken();    // 2. Initate the session
    this.settingtherazorkey();  //3. To set the razor key based on the API
    this.getthebrowserip(); //4. To get the ip address and store in the context
    // this.localstorage();
  }

  settingthetoken() {
    this.loginService.sessionStarter().pipe(debounceTime(300)).subscribe(res => {
      if (res) {
        const tokenVal = res.metaData["token"] || null;
        const tokenKey = res.metaData["httpHeaderKey"] || null;
        this.context.setData(ContextDataItem.TOKEN_KEY, tokenKey);
        this.context.setData(ContextDataItem.TOKEN_VALUE, tokenVal);
        this.localstorage();
      }
    });
  }

  settingtherazorkey() {
    if (window['API_URI'] === 'https://api.service.maiora.co/api/v1') {
      this.context.setData(ContextDataItem.RAZORKEY, 'rzp_live_ciYETKwjRFBYwE');
    } else {
      this.context.setData(ContextDataItem.RAZORKEY, 'rzp_live_ciYETKwjRFBYwE');
    }
  }
  //get the ip address
  getthebrowserip() {
    this.http.get<{ ip: string }>('https://api.ipify.org/?format=json').subscribe((res) => {
      if (res) {
        this.context.setData(ContextDataItem.IP, res ? res.ip : '');
      }
    });
  }
  //localstorage
  localstorage() {
    if (window.localStorage.getItem('TOKEN')) {
      const uuid = window.localStorage.getItem('TOKEN');
      this.profileservice.getprofiledetails(uuid ? uuid : '').subscribe(res => {
        if (res && res["metaData"]) {
          this.context.setData(ContextDataItem.LOGGEDIN, true);
          this.context.setData(ContextDataItem.USER_ID, res["metaData"].user_id);
          this.context.setData(ContextDataItem.USER_NAME, res["metaData"].diaplay_name);
          this.context.setData(ContextDataItem.IMAGE_URL, res["metaData"].profile_picture_url);
          this.context.setData(ContextDataItem.USER_MAIL, res["metaData"].email_id);
          this.context.setData(ContextDataItem.UUID, res["metaData"].uuid);
          this.context.setData(ContextDataItem.USER_ROLE, res["metaData"].user_role_id);
          this.showrouter = true;
        } else {
          this.showrouter = true;
        }
        this.cdref.markForCheck();
      }, err => {
        this.showrouter = true;
      });
    } else {
      this.showrouter = true;
    }
  }
}
