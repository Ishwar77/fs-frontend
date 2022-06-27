import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { LoginComponent } from "../login/login.component";
import { LoginService } from "src/app/services/login";
import { SignUpModel } from "src/app/models/signup";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar';

interface User {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {

  selectedValue: any;
  selectedCar: string;
  disableRegisterBtn = true;
  users: User[] = [
    { value: '3', viewValue: 'User' },
    { value: '6', viewValue: 'Trainer' },
  ];
  genderChoice: string;
  gendervalue: any;
  genderSelect: string[] = ["Male", "Female"];
  valueGender = "Male";
  hide = true;
  chide = true;
  genderSelects = null;

  userRegisterForm = new FormGroup({
    fullName: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("^[a-zA-Z -']+"),
    ]),
    // lastName: new FormControl("", [Validators.pattern("^[a-zA-Z -']+")]),
    // dob: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),

    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(2),
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"),
    ]),
    mobile: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("^([0-9]){10,10}")
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern("[A-Za-z0-9\d$@$!%*?&].{4,}")
    ]),
    cpassword: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern("[A-Za-z0-9\d$@$!%*?&].{4,}")
    ]),
    referral: new FormControl("", [
      Validators.minLength(5),
      Validators.maxLength(65)
    ]),
  });

  private _data: SignUpModel = {};
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
    public dialogRef: MatDialogRef<RegisterComponent>,
    private snackbar: SnackbarService,
    private signupservice: LoginService,
    private route: Router
  ) { }

  ngOnInit() {
  }
  //To open the login dialog
  login() {
    this.dialogRef.close();
    setTimeout(() => {
      this.dailog.open(LoginComponent);
    }, 1000);
  }
  //To select the gender
  genderselection(data) {
    this.gendervalue = data;
  }
  //To register
  signup() {
    this.disableRegisterBtn = false;
    var event = new Date(this.data.dob);
    let date = JSON.stringify(event);
    date = date.slice(1, 11);
    const updatable = {
      name: this.data.name,
      gender: this.gendervalue,
      email: this.data.email,
      mobile: this.data.mobile + "",
      password: this.data.password,
      repeat_password: this.data.cpassword,
      userRoleId: 3,
      isActive: 1,
      referral_code: this.data.referral_code
    };
    if (!this.data.referral_code) {
      delete updatable.referral_code;
    }
    if (this.data.password === this.data.cpassword) {
      this.signupservice.emailtestservice(updatable.email).subscribe(res => {
        if (res && res.metaData && res.metaData.length !== 0) {
          this.snackbar.snackbars("Email ID already exists", "error-snackbar");
        }
      }, err => {
        this.signupservice.signup(updatable).subscribe((res) => {
          if (res) {
            this.dialogRef.close();
            this.snackbar.snackbars("Welcome to FIT-SOCIALS", "sucess-snackbar");
          }
          setTimeout(() => {
            this.dailog.open(LoginComponent);
          }, 3000);
        },
          (err) => {
            this.snackbar.snackbars("Email ID already exists", "error-snackbar");
          }
        );
      })
    } else {
      this.snackbar.snackbars("Password Does Not Matched", "error-snackbar");
    }
  }
  //To reset the entered data
  reset() {
    this.selectedValue = '';
    SignUpModel.clearAll(this._data);
    this.cdref.markForCheck();
  }
  //Route to t&C page
  termsrouting() {
    this.dialogRef.close();
    setTimeout(() => {
      this.route.navigate([`termsandconditions`]);
    }, 1000);
  }
}