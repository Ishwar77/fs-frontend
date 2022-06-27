import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ProfileModel } from 'src/app/models/profile';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { SnackbarService } from 'src/app/services/snackbar';
import { ProfileService } from 'src/app/services/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bmi-info',
  templateUrl: './bmi-info.component.html',
  styleUrls: ['./bmi-info.component.scss']
})
export class BmiInfoComponent implements OnInit {
  userID: any;
  userrole: any;
  bmistatus: any;

  public _data: ProfileModel = {};
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
    private profileservice: ProfileService,
    private snackbar: SnackbarService,
    private context: ApplicationContext,
    private route: Router
  ) { }

  ngOnInit() {
    if (!this.context || !this.context.getData(ContextDataItem.LOGGEDIN)) {
      this.route.navigate(['home']);
      return false;
    }
    this.data.bmi = '';
    this.userID = this.context.getData(ContextDataItem.USER_ID);
    this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
  }
  //To add the fitness details
  addfitdetails() {
    const updatable = {
      user_id: this.userID,
      height: this.data.height,
      weight: this.data.weight,
      BMI: Math.round(this.data.weight / (this.data.height * 0.3048 * this.data.height * 0.3048)) + ''
    }
    if (this.data.height && this.data.weight) {
      this.profileservice.addfitnessdetails(updatable).subscribe((res) => {
        this.data.bmi = updatable.BMI;
        this.bmivalue();
        this.cdref.markForCheck();
      }, err => {
        this.snackbar.snackbars("Can not Add", "error-snackbar");
      })
    } else {
      this.snackbar.snackbars("Please provide the height and weight value", "error-snackbar");
    }
  }
  //To calculate the bmi value and show the status
  bmivalue() {
    if (this.data.bmi && this.data.bmi.length) {
      if (this.data.bmi <= 18.5) {
        this.bmistatus = 'Underweight';
      } else if (this.data.bmi < 25) {
        this.bmistatus = 'Normal Weight';
      } else if (this.data.bmi < 30) {
        this.bmistatus = 'Over Weight';
      } else {
        this.bmistatus = 'Obesity';
      }
      var value = "Your BMI value is " + this.data.bmi + "(" + this.bmistatus + ")"
      this.snackbar.snackbars(value, "info-snackbar");
    }
  }
}