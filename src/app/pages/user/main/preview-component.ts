import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OfferCardModel } from 'src/app/components/components-v2/offers/offer-card.model';
import { EventService } from 'src/app/services/event';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { UserService } from 'src/app/services/users';
import { __metadata } from 'tslib';
import { TrainerService } from 'src/app/services/trainer';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { BatchService } from 'src/app/services/batch';
import { MatDialog } from '@angular/material';
import { MeetingDailogComponent } from 'src/app/components/dialog/meeting-dailog/meeting-dailog.component';

export interface previewdata {
  data: any;
}
@Component({
  selector: 'app-preview-v2',
  templateUrl: './preview-component.html',
  styleUrls: ['./preview-component.scss']
})
export class PreviewComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  statsRow: Array<OfferCardModel> = [];
  userSubscriptionEvents = [];
  trainersList = [];
  eventList = [];
  batches: any = [];
  eventListCount: any;
  topEvents: any;
  trainersListCount: any;
  UserEventList: any;
  CountLength: any;
  reviewCount: any;
  items: any = [];
  events: any = [];
  trainers: any = [];
  menus: any = [];

  constructor(
    private eventservice: EventService,
    private userService: UserService,
    private trainerService: TrainerService,
    private cdref: ChangeDetectorRef,
    private context: ApplicationContext,
    private batchservice: BatchService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const uuID = this.context.getData(ContextDataItem.UUID);
    this.getusers(uuID);
    this.getTopEvents();
    this.getTopTrainers();
    this.getTopbatches(uuID);
  }
  //to get the list of events subscribed
  getusers(uuid) {
    this.eventservice.registeredusers(uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.items = res['metaData'];
          this.CountLength = res.metaData.length;
          this.getcounts(this.CountLength);
        }
        this.cdref.markForCheck();
      },
      (err) => { }
    );
  }
  //to get the top events
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
    },
      (err) => {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
        this.cdref.markForCheck();
      }
    );
  }
  //to get the top trainers
  getTopTrainers() {
    this.trainerService.topTrainers().subscribe((res) => {
      if (res["metaData"] && res["metaData"].length) {
        this.trainers = res["metaData"];
      }
      this.cdref.markForCheck();
    },
      (err) => { }
    );
  }
  //actual counts list
  getcounts(data) {
    this.userService.allcounts().subscribe((res) => {
      this.menus = res['metaData'][0];
      this.trainersListCount = this.menus.Number_Of_Active_Trainers;
      this.eventListCount = this.menus.Number_Of_Active_Events;
      this.reviewCount = this.menus.Number_Of_Active_Reviews;
      this.getStatsData(data, this.trainersListCount, this.eventListCount, this.reviewCount);
      this.cdref.markForCheck();
    });
  }
  //to get the stats data
  getStatsData(sub, trainer, event, review) {
    this.statsRow = [
      { title: 'Subcribed Events', value: sub }
    ];
    this.cdref.markForCheck();
  }
  //To get all the upcoming batches
  getTopbatches(uuid) {
    this.batchservice.getthebatchdetailsforuser(uuid).subscribe((res) => {
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
        for (var i = 0; i < this.batches.length; i++) {
          if (this.batches[i].meeting_links) {
            var link = JSON.parse(this.batches[i].meeting_links);
            this.batches[i]['link'] = link[0].link;
            if (link[0].password) {
              this.batches[i]['password'] = link[0].password;
            }
          }
        }
        if (this.batches.length > 3) {
          this.batches = [this.batches[0], this.batches[1], this.batches[2]];
        }
      }
      this.cdref.markForCheck();
    }
    );
  }
  //route to external meeting link
  meetingdialog(batch) {
    if (batch) {
      const updatable = {
        link: batch.link,
        password: batch.password
      }
      if (!batch.password) {
        delete updatable.password
      }
      this.dialog.open(MeetingDailogComponent, {
        width: '500px',
        data: {
          data: updatable
        }
      });
    }
  }
}