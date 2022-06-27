import { Component, OnInit, Pipe, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'app-client-review',
  templateUrl: './client-review.component.html',
  styleUrls: ['./client-review.component.scss']
})

export class ClientReviewComponent implements OnInit {
  interval = null;
  counter = 0;
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
    // this.automateSlide();
  }

  /**
  * Automatic Slider Interval
  */
  private automateSlide() {
    this.interval = setInterval(() => {
      // this.slideTo(this.getNext());
    }, 10000);
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
    this._sliderImage.map(s => (s.isActive = false));
    this._sliderImage[index].isActive = true;

    if (clicked) {
      clearInterval(this.interval);
      this.cdRef.markForCheck();
      // setTimeout(() => {
      // }, 10000);
      this.automateSlide();
    }
  }
  showNextImage() {
    if (this.counter < this._sliderImage.length - 1) {
      this.counter += 1;
      this.slideTo(this.getNext());
    }
  }

  showPreviousImage() {
    if (this.counter >= 1) {
      this.counter = this.counter - 1;
      this.slideTo(this.getNext());
    }
  }

}
