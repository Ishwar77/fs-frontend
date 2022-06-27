import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BatchService } from 'src/app/services/batch';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { TrainerService } from 'src/app/services/trainer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-trainer',
  templateUrl: './about-trainer.component.html',
  styleUrls: ['./about-trainer.component.scss']
})
export class AboutTrainerComponent implements OnInit {
  pageManager: PageManager = new PageManager();

  @Input() public modeldata: any;
  menus: any = [];
  events: any = [];

  constructor(
    private batchservice: BatchService,
    private trainerservice: TrainerService,
    private cdref: ChangeDetectorRef,
    public route: Router
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.eventslists();
      this.batcheslists();
    }, 2000);
  }

  eventslists() {
    this.trainerservice.activeevents(this.modeldata.uuid).subscribe(res => {
      if (res["metaData"] && res["metaData"].length !== 0) {
        this.events = res["metaData"];
      }
      this.cdref.markForCheck();
    },
      (err) => { });
  }


  batcheslists() {
    this.batchservice.getthebatchdetails(this.modeldata.uuid).subscribe(res => {
      if (res["metaData"] && res["metaData"].length !== 0) {
        const servicData = res["metaData"];
        this.menus = servicData && servicData.map(k => {
          let timeString = k.start_time;
          const H = +timeString.substr(0, 2);
          const h = (H % 12) || 12;
          const ampm = H < 12 ? ' AM' : ' PM';
          timeString = h + timeString.substr(2, 3) + ampm;
          let endtimeString = k.end_time;
          const EH = +endtimeString.substr(0, 2);
          const eh = (EH % 12) || 12;
          const eampm = EH < 12 ? ' AM' : ' PM';
          endtimeString = eh + endtimeString.substr(2, 3) + eampm;
          return Object.assign({}, k, {
            start_time_new: timeString,
            end_time_new: endtimeString
          });
        });
        if (this.menus.length > 3) {
          this.menus = [this.menus[0], this.menus[1], this.menus[2]];
        }
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.SUCCESS;
      } else {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
      }
      this.cdref.markForCheck();
    },
      (err) => {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
        this.cdref.markForCheck();
      });
  }
}
