import { Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";

export enum LoadingImageSize {
  SMALL = 1,
  MEDIUM = 2,
  BIG = 3,
}

/**
 *
 * Usage: <app-loading-component [imageSize]="2" > </app-loading-component>
 */

@Component({
  selector: "app-loading-component",
  templateUrl: "./component.html",
  styleUrls: ["component.scss"],
})
export class AppLoadingComponent implements OnInit {
  private _imageSize: LoadingImageSize = LoadingImageSize.MEDIUM;
  @Input()
  get imageSize() {
    return this._imageSize;
  }
  set imageSize(s) {
    this._imageSize = s;
  }

  height = "100px";
  width = "100px";

  constructor(private _cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this._imageSize) {
      this._imageSize = LoadingImageSize.MEDIUM;
      this._cdRef.markForCheck();
    }

    this.updateImageDimensions(this.imageSize);
  }

  private updateImageDimensions(imageSize: LoadingImageSize) {
    switch (imageSize) {
      case LoadingImageSize.SMALL:
        this.height = "50px";
        this.width = "50px";
        break;
      case LoadingImageSize.BIG:
        this.height = "200px";
        this.width = "200px";
        break;
      case LoadingImageSize.MEDIUM:
        this.height = "100px";
        this.width = "100px";
        break;
    }
    this._cdRef.markForCheck();
  }
}
