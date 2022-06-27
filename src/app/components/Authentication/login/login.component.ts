import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { LoginService } from "src/app/services/login";
import { ApplicationContext, ContextDataItem } from "src/app/util/context/applicationContext";
import { Router } from "@angular/router";
import { MatDialogRef, MatDialog } from "@angular/material";
import { RegisterComponent } from "../register/register.component";
import { LoginModel } from "src/app/models/login";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { SnackbarService } from 'src/app/services/snackbar';
import { SessionService } from 'src/app/services/session';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hide = true;
  path: any;
  @ViewChild("password", { static: true }) password: ElementRef;

  checked: any = false;
  private _data: LoginModel = {};
  @Input()
  get data() {
    return this._data;
  }
  set data(d) {
    this._data = d;
    this.cdref.markForCheck();
  }

  constructor(
    private cdref: ChangeDetectorRef,
    private dailog: MatDialog,
    private loginservice: LoginService,
    private context: ApplicationContext,
    public dialogRef: MatDialogRef<LoginComponent>,
    private route: Router,
    private snackbar: SnackbarService,
    private sessionservice: SessionService
  ) { }

  userLoginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(2),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]),

    password: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern("[A-Za-z0-9\d$@$!%*?&].{4,}"),
    ]),
  });

  get passwords() {
    return this.userLoginForm.get('password');
  }

  ngOnInit() {
    this.data.email = this.context.getData(ContextDataItem.USER_MAIL) || '';
    this.data.password = window.localStorage.getItem('password') || '';
    this.path = this.route.url;
    // this.manageEnterKeyPress();
  }

  private manageEnterKeyPress() {
    // To manage the enter key press in password field
    // TODO: Verify why the form is being reset, upon enter keypress; use the same logic for other forms too.
    fromEvent(this.password.nativeElement, "keyup")
      .pipe(debounceTime(300))
      .subscribe((res: KeyboardEvent) => {
        if (res && res.code === "Enter") {
          this.Login();
          return;
        }
      });
  }
  //To Login
  Login() {
    const values = {
      email: this.data.email,
      password: this.data.password,
    };
    this.loginservice.login(values).subscribe((res) => {
      this.dialogRef.close({
        message: "Login Successfull",
      });

      var name = "Hello " + res["metaData"].user.diaplay_name + " Welcome back"
      this.snackbar.snackbars(name, "info-snackbar");
      const userId = res["metaData"].user.user_id;
      const userrole = res["metaData"].user.user_role_id;
      const username = res["metaData"].user.diaplay_name;
      const url = res["metaData"].user.profile_picture_url;
      const mail = res['metaData'].user.email_id;
      const activestatus = res["metaData"].user.isActive;
      //To set the various values to the context
      if (res && res.metaData && res.metaData["token"]) {
        this.context.setData(ContextDataItem.TOKEN_VALUE, res.metaData["token"]);
        this.context.setData(ContextDataItem.LOGGEDIN, true);
        this.context.setData(ContextDataItem.USER_ID, userId);
        this.context.setData(ContextDataItem.USER_NAME, username);
        this.context.setData(ContextDataItem.IMAGE_URL, url);
        this.context.setData(ContextDataItem.USER_MAIL, mail);
        this.context.setData(ContextDataItem.UUID, res.metaData.user.uuid);

        if (this.checked === true) {
          window.localStorage.setItem("TOKEN", res && res.metaData && res.metaData.user && res.metaData.user.uuid ? res.metaData.user.uuid : '');
        }

        if (activestatus === 1) {
          this.context.setData(ContextDataItem.USER_ROLE, userrole);
        }
        this.cdref.markForCheck();
      }
      this.sessioncheck(userId ? userId : '', res ? res.metaData[`token`] : '');
      if (userrole == 1) {
        this.route.navigate([`admin`]);
      }
      if (userrole == 3) {
        if (this.path == '/home') {
          //   this.route.navigate([`user`]);
          this.route.navigate([`dashboard`]);
        } else {
          return false;
        }
      }
      if (userrole == 6 && activestatus === 1) {
        this.route.navigate([`dashboard`]);
      } else if (activestatus === 0) {
        this.snackbar.snackbars("Wait for Admin to Approve", "error-snackbar");
      } else {
        return false;
      }
    },
      (err) => {
        this.snackbar.snackbars("Wrong username and password", "error-snackbar");
        setTimeout(() => {
          this.reset();
        }, 1000);
      });
  }
  //reset the entered data
  reset() {
    LoginModel.clearAll(this._data);
    this.cdref.markForCheck();
  }
  //route to forgot password page
  forgot() {
    this.dialogRef.close();
    this.route.navigate([`reset`]);
  }
  //open the user signup dialog
  register() {
    this.dialogRef.close();
    setTimeout(() => {
      this.dailog.open(RegisterComponent);
    }, 1000);
    this.cdref.markForCheck();
  }
  //route to trainer signup page
  trainer() {
    this.dialogRef.close();
    setTimeout(() => {
      this.route.navigate([`trainer-register`]);
    }, 1000);
    this.cdref.markForCheck();
  }
  //create a session
  sessioncreate(userId, token) {
    const ip = this.context.getData(ContextDataItem.IP);
    if (userId && token) {
      var update = {
        userId: userId,
        ip: ip,
        jwt: token
      }
      this.sessionservice.createsession(update ? update : '').subscribe(result => {
        this.cdref.markForCheck();
      }, err => {
        window.location.reload();
      });
    } else {
      return null;
    }
    this.cdref.markForCheck();
  }
  //to check whether a session exists or not
  sessioncheck(userId, token) {
    console.log("userId, token ", userId, token)
    // this.sessionservice.getsessiobbyuserid(userId ? userId : '').subscribe(res => {
    //   console.log("res ", res);
    //   if (res) {
    //     (res.metaData.length === 0 ? this.sessioncreate(userId, token) : this.sessiondelete(userId, token));
    //   }
    // }, err => {
    //   this.sessioncreate(userId, token);
    // });
    this.cdref.markForCheck();
  }
  //delete the session
  sessiondelete(userId, token) {
    this.sessionservice.deletesession(userId ? userId : '').subscribe(res => {
      if (res) {
        this.sessioncreate(userId, token);
        this.cdref.markForCheck();
      }
    });
  }
}