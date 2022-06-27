import { MatIconModule } from "@angular/material";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoContentComponent } from "./component";

@NgModule({
  declarations: [NoContentComponent],
  imports: [CommonModule, MatIconModule],
  exports: [NoContentComponent],
})
export class NoContentModule {}
