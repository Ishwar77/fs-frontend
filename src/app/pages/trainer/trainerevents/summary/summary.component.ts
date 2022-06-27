import { ApplicationContext, ContextDataItem, ContextActionListencer, ContextEvents } from 'src/app/util/context/applicationContext';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminDashMenu } from "./model";
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionService } from 'src/app/services/subscription';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  selectedEventId: number;
  eventId: any;
  items: any = [];
  showbatch: boolean = false;
  showview: boolean = false;
  sid: any;
  sname: any;
  constructor(
    private _cdRef: ChangeDetectorRef,
    private context: ApplicationContext,
    private route: Router,
    private subsservice: SubscriptionService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.selectedEventId = this.context.getData(ContextDataItem.EventUUID);
    this.getsubscription(this.selectedEventId);
    this.context.listener.subscribe((res: ContextActionListencer) => {
      if (res.event === ContextEvents.VALUDE_CHANGED) {
        this.showbatch = this.context.getData(ContextDataItem.SHOWBATCHES);
        this._cdRef.markForCheck();
      }
    });
    this._cdRef.markForCheck();
  }

  routerBack() {
    this.route.navigate([`myevents`]);
    this._cdRef.markForCheck();
  }

  getsubscription(Id) {
    this.subsservice.subscriptionByID(Id).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.items = res["metaData"];
          this.selectedsubscription(this.items[0]);
        }
        this._cdRef.markForCheck();
      }
    );
  }

  selectedsubscription(data) {
    this.sid = data.subscription_id;
    this.sname = data.days;
    this.context.setData(ContextDataItem.SUBSCRIPTION_ID, data.uuid);
    this._cdRef.markForCheck();
  }

  batchview(value) {
    if (value === 3) {
      this.showview = true;
      this._cdRef.markForCheck();
    }
    else {
      this.showview = false;
      this._cdRef.markForCheck();
    }
  }
}