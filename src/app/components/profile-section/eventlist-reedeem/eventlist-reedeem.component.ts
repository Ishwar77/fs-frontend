import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { EventService } from 'src/app/services/event';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { RedemptionService } from 'src/app/services/redemption';
import { SnackbarService } from 'src/app/services/snackbar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RewardsDataManage } from '../rewards/rewards.component';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';

@Component({
  selector: 'app-eventlist-reedeem',
  templateUrl: './eventlist-reedeem.component.html',
  styleUrls: ['./eventlist-reedeem.component.scss']
})
export class EventlistReedeemComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  EventRewardList: any = [];
  public eventid: any;
  public trainerid: any;
  constructor(
    private eventService: EventService,
    private cdref: ChangeDetectorRef,
    private redemptionservice: RedemptionService,
    private snackbar: SnackbarService,
    private dialogref: MatDialogRef<EventlistReedeemComponent>,
    @Inject(MAT_DIALOG_DATA) public item: RewardsDataManage,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    if (!this.item) {
      this.dialogref.close();
    }
    this.eventList()
  }
  //to get the event lists
  eventList() {
    this.eventService.eventdata().subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.EventRewardList = res["metaData"];
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.SUCCESS;
        } else {
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.FAILED;
        }
      },
      (err) => {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
      }
    );
    this.cdref.markForCheck();
  }
  //redem request
  reedemrequest() {
    const update = {
      userId: this.item ? this.item.menus.User.user_id : '',
      pointId: this.item ? this.item.menus.id : '',
      eventId: this.eventid ? this.eventid : '',
      trainerId: this.trainerid ? this.trainerid : '',
      points: this.item ? this.item.menus.balance_points : ''
    }
    this.redemptionservice.createredemption(update ? update : '').subscribe(res => {
      if (res && res.metaData) {
        this.dialogref.close({
          data: true
        });
        this.snackbar.snackbars("Point redemption requested successfully, you will receive the message once the trainer approves", "info-snackbar");
      }
    }, err => {
      this.snackbar.snackbars("Point redemption request failed", "error-snackbar");
    });
    this.cdref.markForCheck();
  }
  //name selection and trainer selection
  nameselection(obj) {
    this.eventid = obj ? obj.event_id : '';
    this.trainerid = obj ? obj.Instructor.user_id : '';
    this.cdref.markForCheck();
  }
}