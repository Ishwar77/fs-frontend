import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ProfileModel } from 'src/app/models/profile';
import { SnackbarService } from 'src/app/services/snackbar';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { Router } from '@angular/router';
import { ForgotService } from 'src/app/services/forgotpassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public _data: ProfileModel = {};
  @Input()
  get data() {
    return this._data;
  }
  set data(d) {
    this._data = d;
    this.cdref.markForCheck();
  }

  @Output() public back: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private cdref: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private password: ForgotService,
    private context: ApplicationContext,
    private route: Router
  ) { }

  ngOnInit() {
    if (!this.context || !this.context.getData(ContextDataItem.LOGGEDIN)) {
      this.route.navigate(['home']);
      return false;
    }
  }
  //Password update change
  update() {
    if (this.data.cpassword === this.data.password) {
      const update = {
        email: this.context.getData(ContextDataItem.USER_MAIL),
        password: this.data.password
      };
      this.password.changepassword(update).subscribe((res) => {
        this.snackbar.snackbars("Password has been updated successfully", "info-snackbar");
        this.back.next();
        this.cdref.markForCheck();
      }, err => {
        this.snackbar.snackbars("Password Cannot be updated", "error-snackbar");
        this.cdref.markForCheck();
      });
    }
  }
  //To reset the data
  reset() {
    ProfileModel.clearall(this.data);
    this.cdref.markForCheck();
  }
}