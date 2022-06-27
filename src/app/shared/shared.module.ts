import { BrowserModule } from "@angular/platform-browser";
import {
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
} from "@angular/material";
import { NoContentModule } from "./no-content/index";
import { AppLoadingModule } from "./loading/index";
import { CustomPipesModule } from "./pipes/index";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from './material-module/index.module';

const basics = [CommonModule, FormsModule, ReactiveFormsModule];

const hostResources = [CustomPipesModule, AppLoadingModule, NoContentModule];

const thirdPartyResources = [
  FlexLayoutModule,
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
  MaterialModule
];

@NgModule({
  exports: [basics, hostResources, thirdPartyResources],
  imports: [basics, hostResources, thirdPartyResources],
})
export class SharedModule {}
