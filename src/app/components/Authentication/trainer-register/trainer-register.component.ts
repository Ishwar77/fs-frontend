import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { SignUpModel } from 'src/app/models/signup';
import { MatDialog } from '@angular/material';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { PaymentService } from 'src/app/services/payment';
import * as uuid from "uuid";
import { LoginService } from 'src/app/services/login';
import { SnackbarService } from 'src/app/services/snackbar';
import { LoginComponent } from 'src/app/components/Authentication/login/login.component';
declare var Razorpay: any;

@Component({
  selector: 'app-trainer-register',
  templateUrl: './trainer-register.component.html',
  styleUrls: ['./trainer-register.component.scss']
})

export class TrainerRegisterComponent implements OnInit {
  @ViewChild('hidden', { static: true }) hidden: ElementRef;
  selectedValue: any;
  showtemplate: boolean = false;
  disableRegisterBtn = true;
  gendervalue: any;
  genderSelect: string[] = ["Male", "Female"];
  hide = true;
  chide = true;
  paymentSuccess = false;
  genderSelects = null;

  userRegisterForm = new FormGroup({
    fullName: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("^[a-zA-Z -']+"),
    ]),
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
      Validators.pattern("^([0-9]){10,10}"),
    ]),

    referral: new FormControl("", [
      Validators.minLength(5),
      Validators.maxLength(65)
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
    private paymentservice: PaymentService,
    private dailog: MatDialog,
    private snackbar: SnackbarService,
    private context: ApplicationContext,
    private emailtestservice: LoginService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.showtemplate = true;
    }, 4000);
  }

  login() {
    setTimeout(() => {
      this.dailog.open(LoginComponent);
    }, 1000);
  }

  genderselection(data) {
    this.gendervalue = data;
  }

  fstrasu() {
    this.disableRegisterBtn = false;
    this.cdref.markForCheck();
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
      userRoleId: 6,
      isActive: 0,
      referral_code: this.data.referral_code
    };
    if (!this.data.referral_code) {
      delete updatable.referral_code;
    }
    if (this.data.password === this.data.cpassword) {
      this.emailtestservice.emailtestservice(updatable.email).subscribe(res => {
        if (res && res.metaData && res.metaData.length !== 0) {
          this.snackbar.snackbars("Email Id already exists", "info-snackbar");
          this.cdref.markForCheck();
        } else {
          this.selectmenu(updatable);
        }
      }, err => {
        this.selectmenu(updatable);
        this.cdref.markForCheck();
      });
    } else {
      this.snackbar.snackbars("Password Do Not Matched", "error-snackbar");
    }
  }

  reset() {
    this.selectedValue = '';
    SignUpModel.clearAll(this._data);
    this.cdref.markForCheck();
  }

  selectmenu(data) {
    const razorPayOptions = TrainerRegisterComponent.getRPOptions();
    const updatable = {
      amount: 2000 * 100,
      reciptId: uuid.v4(),
    };
    var razorkey = this.context.getData(ContextDataItem.RAZORKEY);
    this.paymentservice.ordergenerate(updatable).subscribe(
      (res) => {
        this.cdref.markForCheck();
        const rpOpder = res["metaData"];
        razorPayOptions.key = razorkey;
        razorPayOptions.order_id = rpOpder.id;
        razorPayOptions.amount = rpOpder.amount;
        razorPayOptions.prefill.name = data.name;
        razorPayOptions.prefill.email = data.email;
        razorPayOptions.prefill.contact = data.mobile;
        razorPayOptions["handler"] = this.razorPayResponsehandler.bind(this, data);
        razorPayOptions.notes = rpOpder.notes;
        const rzp1 = new Razorpay(razorPayOptions);
        rzp1.open();
      },
      (err) => { }
    );
  }

  razorPayResponsehandler(data, response): void {
    this.reset();
    const updatable = {
      user: {
        name: data.name,
        gender: data.gender,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        repeat_password: data.repeat_password,
        userRoleId: 6,
        final_amount: 2000,
        isActive: 0
      },
      payment: {
        rp_orderId: response.razorpay_order_id || null,
        rp_paymentId: response.razorpay_payment_id || null,
        rp_payment_response_json: JSON.stringify(response) || ""
      }
    };
    this.paymentservice.paymentgeneratefortrainers(updatable).subscribe(
      (res) => {
        if (res) {
          this.paymentSuccess = true;
          setTimeout(() => {
            (this.hidden.nativeElement as HTMLElement).click();
          }, 100);
          // this.cdref.markForCheck();
          // const msg = document.createElement("div");
          // msg.setAttribute("class", "payment-success")
          // msg.innerHTML = `
          //   <p><b>Hello ${data.name}, Your Payment of Rs.2000 has been Successfull</b></p>
          //  <p> You will recieve a confirmation email to ${data.email} in sometime,Thank you</p>
          //   <a  href="" style="background-color: royalblue !important;
          //   color: #fff !important;
          //   text-decoration: none !important; border-radius: 10px;
          //   margin: 10px 0px;
          //   padding: 15px !important;">Back to Home</a>

          //   `;
          // document.body.prepend(msg);
        }
      },
      (err) => {
        this.snackbar.snackbars("Payment Failed,Please try again", "error-snackbar");
      }
    );
  }

  public static getRPOptions() {
    return {
      key: "",
      amount: "",
      currency: "INR",
      name: "THE FIT SOCIAL",
      description: "Trainer Registration",
      image: "https://maiora-images.maiora.co/FITSOCIAL/logo/FitSocialBlack.jpg",
      order_id: "",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: "",
      theme: {
        color: "#000",
      },
    };
  }

  onlyNumbers(event) {
    this.context.onlyPositiveNumbers(event);
  }
  sucesspage() {
  }
}