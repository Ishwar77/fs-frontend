import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RegisterModule } from "../../Authentication/register/register.module";
import { RegisterComponent } from "../../Authentication/register/register.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../../../../app/shared/material-module/index.module';
import { LoginComponent } from '../../Authentication/login/login.component';
import { LoginModule } from '../../Authentication/login/login.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, FlexLayoutModule, RegisterModule, LoginModule, RouterModule, MaterialModule],
  exports: [HeaderComponent],
  entryComponents: [RegisterComponent, LoginComponent],
})
export class HeaderModule { }
