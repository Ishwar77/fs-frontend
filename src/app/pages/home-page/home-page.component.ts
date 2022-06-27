import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { EventService } from '../../../app/services/event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  load = false;
  sliderImageDataModel: Array<any> = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private eventservice: EventService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdRef.markForCheck();
    setTimeout(() => {
      this.loadSliderImagesAPIService();
      this.load = true;
      this.cdRef.markForCheck();
    }, 3000);
  }

  loadSliderImagesAPIService() {
    this.eventservice.eventdata().subscribe(response => {
      if (response) {
        const sliderData = response ? response['metaData'] : [];
        this.cdRef.markForCheck();
        this.sliderImageDataModel = sliderData && sliderData.map((slidedata) => {
          return Object.assign({}, slidedata, {
            isActive: false,
          });
        });
        this.sliderImageDataModel[0].isActive = true;
        this.cdRef.markForCheck();
      }
    });
  }
}
