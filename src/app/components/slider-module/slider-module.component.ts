import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-slider-ad',
  templateUrl: './slider-module.component.html',
  styleUrls: ['./slider-module.component.scss']
})
export class SlideComponent implements OnInit {

  interval = null;
  _sliderImage: Array<any> = [];
  @Input()
  get sliderImage(): Array<any> {
    return this._sliderImage;
  }
  set sliderImage(value: Array<any>) {
    this._sliderImage = value;
  }

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.automateSlide();
  }

  /**
  * Automatic Slider Interval
  */
  private automateSlide() {
    this.interval = setInterval(() => {
      this.slideTo(this.getNext());
    }, 5000);
    this.cdRef.markForCheck();
  }

  private getNext() {
    let active = 0;
    for (let i = 0; i < this._sliderImage.length; i++) {
      active = this._sliderImage[i].isActive ? i + 1 : active;
    }
    return active >= this._sliderImage.length ? 0 : active;
  }

  slideTo(index, clicked = false) {
    if (this._sliderImage.length) {
      this._sliderImage.map(s => (s.isActive = false));
      this._sliderImage[index].isActive = true;

      if (clicked) {
        clearInterval(this.interval);
        this.cdRef.markForCheck();
        this.automateSlide();
      }
    }
  }
}
