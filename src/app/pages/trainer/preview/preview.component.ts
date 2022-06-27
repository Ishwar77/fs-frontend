import { Router } from '@angular/router';
import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/users';
import { TrainerService } from 'src/app/services/trainer';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { BatchService } from 'src/app/services/batch';
import { StatsCardModel } from 'src/app/components/components-v2/stats-card/stats-card.model';
import { EventService } from 'src/app/services/event';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements AfterViewInit {
  pageManager: PageManager = new PageManager();
  statsRow: Array<StatsCardModel> = [];
  trainersList = [];
  eventList = [];
  eventListCount: any;
  topEvents: any;
  items: any = [];
  events: any = [];
  trainers: any = [];
  batches: any = [];
  menus: any = [];
  constructor(
    private eventservice: EventService,
    private userService: UserService,
    private trainerService: TrainerService,
    private batchservice: BatchService,
    private cdref: ChangeDetectorRef,
    private context: ApplicationContext,
    private route: Router
  ) { }

  ngAfterViewInit() {
    const uuid = this.context.getData(ContextDataItem.UUID);
    this.getTopEvents();
    this.getcounts(uuid);
    this.getTopTrainers();
    this.eventLists(uuid);
    this.getTopbatches(uuid);
  }
  //To get the events handled by the trainer
  eventLists(uuid) {
    this.trainerService.activeevents(uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.items = res["metaData"];
        }
        this.cdref.markForCheck();
      }
    );
  }
  //To get all events in the application
  getTopEvents() {
    this.eventservice.topEvents().subscribe((res) => {
      if (res["metaData"] && res["metaData"].length) {
        this.events = res["metaData"];
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.SUCCESS;
      } else {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
      }
      this.cdref.markForCheck();
    }, (err) => {
      this.pageManager.status = PageStatus.READY;
      this.pageManager.action = PageAction.FAILED;
      this.cdref.markForCheck();
    }
    );
  }
  //To get all the top trainers in the application
  getTopTrainers() {
    this.trainerService.topTrainers().subscribe((res) => {
      if (res["metaData"] && res["metaData"].length) {
        this.trainers = res["metaData"];
      }
      this.cdref.markForCheck();
    }
    );
  }
  //To get all the upcoming batches
  getTopbatches(uuid) {
    this.batchservice.getthebatchdetails(uuid).subscribe((res) => {
      if (res["metaData"] && res["metaData"].length !== 0) {
        const servicData = res["metaData"];
        this.batches = servicData && servicData.map(k => {
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
        if (this.batches.length > 3) {
          this.batches = [this.batches[0], this.batches[1], this.batches[2]];
        }
      }
      this.cdref.markForCheck();
    }
    );
  }

  getcounts(uuid) {
    this.userService.allcountsfortrainer(uuid).subscribe((res) => {
      this.menus = res['metaData'][0];
      this.eventListCount = this.menus.Number_Of_Trainer_Active_Events;
      this.getStatsData(this.eventListCount);
      this.cdref.markForCheck();
    });
  }

  getStatsData(event) {
    this.statsRow = [
      { title: 'Events', value: event }
    ];
    this.cdref.markForCheck();
  }
}