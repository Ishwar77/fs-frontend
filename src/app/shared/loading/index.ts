import { CommonModule } from "@angular/common";
import { AppLoadingComponent } from "./component";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppLoadingComponent],
  exports: [AppLoadingComponent],
  imports: [CommonModule, FlexLayoutModule],
})
export class AppLoadingModule { }
