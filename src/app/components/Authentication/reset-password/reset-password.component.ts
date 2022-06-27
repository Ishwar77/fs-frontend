import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { ForgotService } from "src/app/services/forgotpassword";

import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { ForgotpasswordModel } from "src/app/models/forgotpass";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  email: any;
  hide = true;
  showview: boolean = false;
  private _data: ForgotpasswordModel = {};
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
    private forgotservice: ForgotService,
    private _snackbar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit() {}

  forgot() {
    const updatable = {
      email: this.data.email,
    };
    this.forgotservice.passwordservice(updatable).subscribe(
      (res) => {
        this.email = this.data.email;
        this.showview = true;
      },
      (err) => {
        this._snackbar.open("The Email does not exist", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
        this.reset();
      }
    );
  }

  passwordreset() {
    const updatable = {
      email: this.data.email,
      token: this.data.token,
      password: this.data.password,
    };
    if (this.data.password === this.data.cpassword) {
      this.forgotservice.resetservice(updatable).subscribe(
        (res) => {
          this._snackbar.open("Password has been updated successfully", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["sucess-snackbar"],
          });
          setTimeout(() => {
            this.route.navigate([`home`]);
            this.cdref.markForCheck();
          }, 2000);
        },
        (err) => {
          this._snackbar.open("The token value is wrong", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["error-snackbar"],
          });
          setTimeout(() => {
            this.reset();
          }, 2000);
        }
      );
    } else {
      this._snackbar.open("Passwords does not match", "", {
        duration: 3000,
        verticalPosition: "top",
        panelClass: ["error-snackbar"],
      });
      this.reset();
    }
  }
  reset() {
    ForgotpasswordModel.clearAll(this._data);
    this.cdref.markForCheck();
  }

  resetForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(2),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]),
  });

  updateForm = new FormGroup({
    token: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),
    cpassword: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
}
