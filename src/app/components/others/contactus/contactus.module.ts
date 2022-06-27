import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactusComponent } from "./contactus.component";
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule } from 'ng-recaptcha';
import { Routes, RouterModule } from "@angular/router";
import {
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
const route: Routes = [{ path: "", component: ContactusComponent }];

@NgModule({
  declarations: [ContactusComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RouterModule.forChild(route),
  ],
  exports: [ContactusComponent],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LcnybIZAAAAAFDvgbkGhww2LBO1zJYgziLeyRO9',
    } as RecaptchaSettings,
  }]
})
export class ContactusModule {}
