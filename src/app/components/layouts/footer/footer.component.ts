import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { RegisterComponent } from "../../Authentication/register/register.component";
import { MatDialog, ErrorStateMatcher } from "@angular/material";
import { ApplicationContext, ContextEvents, ContextDataItem, ContextActionListencer } from 'src/app/util/context/applicationContext';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { LoginComponent } from '../../Authentication/login/login.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  public toggle: boolean = false;
  public date: any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private dailog: MatDialog,
    private cdref: ChangeDetectorRef,
    private context: ApplicationContext) { }

  ngOnInit() {
    //Actively listening to the context to check the login status
    // this.context.listener.subscribe((res: ContextActionListencer) => {
    //   if (res.event === ContextEvents.VALUDE_CHANGED) {
    //     if (res.data && res.data.key && res.data.key === ContextDataItem.LOGGEDIN) {
    //       this.toggle = this.context.getData(ContextDataItem.LOGGEDIN);
    //       this.cdref.markForCheck();
    //     }
    //   } else if (res.event && res.event === ContextEvents.CONTEXT_DESTROYED) {
    //     this.toggle = this.context.getData(ContextDataItem.LOGGEDIN);;
    //     this.cdref.markForCheck();
    //   }
    // });
    this.context.listener.subscribe((res: ContextActionListencer) => {
      if (res.event === ContextEvents.VALUDE_CHANGED) {
        if (res.data && res.data.key && res.data.key === ContextDataItem.TOKEN_VALUE) {
          this.toggle = this.context.getData(ContextDataItem.LOGGEDIN);
          this.cdref.markForCheck();
        }
      }
    });
    this.date = new Date().getFullYear(); //get the current year
  }
  //open the login dialog
  login() {
    this.dailog.open(LoginComponent);
  }
  //open the register dialog
  register() {
    this.dailog.open(RegisterComponent);
  }
}
