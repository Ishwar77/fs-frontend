import { HighlightPipe } from "./highlight";
import { CommonModule } from "@angular/common";
import { StringTrimmer } from "./trim";
import { NgModule } from "@angular/core";

const assets = [StringTrimmer, HighlightPipe];

@NgModule({
  declarations: [assets],
  exports: [assets],
  imports: [CommonModule],
})
export class CustomPipesModule {}
