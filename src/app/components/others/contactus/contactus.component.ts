import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { ContactModel } from "src/app/models/contact";
import { ContactService } from "src/app/services/contact";
import { Validators, FormControl, FormGroup } from "@angular/forms";
import { ApplicationContext } from 'src/app/util/context/applicationContext';
import { SnackbarService } from 'src/app/services/snackbar';

@Component({
  selector: "app-contactus",
  templateUrl: "./contactus.component.html",
  styleUrls: ["./contactus.component.scss"],
})
export class ContactusComponent implements OnInit {
  private _data: ContactModel = {};

  @Input()
  get data() {
    return this._data;
  }
  set data(d) {
    this._data = d;
    this.cdRef.markForCheck();
  }
  constructor(
    private contactservice: ContactService,
    private cdRef: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  //submit the contact
  contact() {
    const updatable = {
      full_name: this.data.full_name,
      mobile_number: this.data.mobile_number + "",
      email: this.data.email,
      subject: this.data.subject,
      message: this.data.message,
    };
    this.contactservice.contactAction(updatable ? updatable : null).subscribe((res) => {
      if (res) {
        this.snackbar.snackbars("Thank you, you will receive the answer for the query soon", "info-snackbar");
      }
      setTimeout(() => {
        this.reset();
      }, 4000);
    }, (err) => {
      this.snackbar.snackbars("Please provide the required details", "error-snackbar");
    });
    this.cdRef.markForCheck();
  }
  //reset the fields
  reset() {
    ContactModel.clearAll(this._data);
    this.cdRef.markForCheck();
  }

  contactForm = new FormGroup({
    fullName: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("^[a-zA-Z -']+"),
    ]),
    subject: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required]),

    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(2),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]),
    mobile: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("^([0-9]){10,10}"),
    ]),
    recaptchaReactive: new FormControl("", [Validators.required])
  });

  onlyNumbers(event) {
    this.context.onlyPositiveNumbers(event);
  }
}
