import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatDialog } from "@angular/material";
import { EventService } from "src/app/services/event";
import { ApplicationContext, ContextDataItem } from "src/app/util/context/applicationContext";
import { PageStatus, PageAction, PageManager } from "src/app/models/page";
import { BatchUpdateComponent } from 'src/app/components/dialog/batch-update/batch-update.component';
import { BatchService } from 'src/app/services/batch';

export interface Eventlistmodel {
  slno: number;
  event_name: string;
  start_date: any;
  end_date: any;
  start_time: any;
  end_time: any;
  meeting_links: any;
  id: any;
}
export interface BatchTransfermodel {
  batches: any;
}

@Component({
  selector: "app-eventlist",
  templateUrl: "./eventlist.component.html",
  styleUrls: ["./eventlist.component.scss"],
})
export class EventlistComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];
  users: any = [];
  loadingvalue: boolean = true;
  constructor(
    private cdref: ChangeDetectorRef,
    private eventservice: EventService,
    private context: ApplicationContext,
    private dialog: MatDialog,
    private batchservice: BatchService
  ) { }

  ngOnInit() {
    this.loadinit();
  }

  loadinit() {
    const uuID = this.context.getData(ContextDataItem.UUID);
    this.getusers(uuID);
  }

  getusers(uuID) {
    this.eventservice.registeredusers(uuID).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.users = res["metaData"];
          this.users = this.users && this.users.map(k => {
            return Object.assign({}, k, {
              start_time_new: this.timeformat(k.Subscription.Batch.start_time),
              end_time_new: this.timeformat(k.Subscription.Batch.end_time)
            });
          });
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
  //updating the particular batch
  getBatchTransfer(obj) {
    obj.menu.subscriptionuuid = obj.modeldata.Subscription.uuid;
    obj.menu.user_id = obj.modeldata.user_id;
    const dailogRef = this.dialog.open(BatchUpdateComponent, {
      width: '500px',
      data: obj.menu,
    });
    dailogRef.afterClosed().subscribe(result => {
      this.loadinit();
    });
  }
  //to get the batches data
  getbatchesinfo(event) {
    this.menus = [];
    this.batchservice.getregbatchid(event.registration_id).subscribe(res => {
      if (res && res['metaData']) {
        this.menus = res['metaData'];
        this.menus = this.menus && this.menus.map(k => {
          return Object.assign({}, k, {
            start_time_new: this.timeformat(k.Batch.start_time),
            end_time_new: this.timeformat(k.Batch.end_time)
          });
        });
        this.cdref.markForCheck();
      }
    })
  }
  //time format
  timeformat(k) {
    let timeString = k;
    const H = +timeString.substr(0, 2);
    const h = (H % 12) || 12;
    const ampm = H < 12 ? ' AM' : ' PM';
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }
}
