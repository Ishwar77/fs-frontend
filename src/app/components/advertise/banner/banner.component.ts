import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { AdvertiseService } from 'src/app/services/advertsise';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {


  private _modelData
  @Input()
  get modelData() {
    return this._modelData;
  }
  set modelData(c) {
    this._modelData = c;
    this.cdref.markForCheck();
  }
  constructor(
    private advertiseService:AdvertiseService,
    private cdref:ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

}
