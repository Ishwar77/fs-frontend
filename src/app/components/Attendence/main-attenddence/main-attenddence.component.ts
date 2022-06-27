import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { AttendenceService } from "src/app/services/attendence";
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { ActivatedRoute } from '@angular/router';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { SnackbarService } from 'src/app/services/snackbar';
import { Location } from '@angular/common';
import { BatchService } from 'src/app/services/batch';

@Component({
  selector: "app-main-attenddence",
  templateUrl: "./main-attenddence.component.html",
  styleUrls: ["./main-attenddence.component.scss"],
})
export class MainAttenddenceComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  public userList: any = [];
  public batchdetails: any = [];
  public UUId: any;
  public eventid: any;
  public batchid: any;
  public batchuuid: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private attendenceService: AttendenceService,
    private context: ApplicationContext,
    private activatedroute: ActivatedRoute,
    private snackbar: SnackbarService,
    private location: Location,
    private batchservice: BatchService,
  ) { }

  ngOnInit() {
    this.listentourl();
  }
  //Listen to URl
  listentourl() {
    this.activatedroute.params.subscribe(res => {
      this.UUId = res.uuid;
      if (this.UUId) {
        this.getAllUserList(this.UUId);
      }
      this.cdRef.markForCheck();
    });
  }
  //To get all the details
  getAllUserList(uuid) {
    if (uuid) {
      this.attendenceService.getInfo(uuid).subscribe((res) => {
        if (res["metaData"] && res['metaData'].length) {
          this.batchdetails = res['metaData'][0].Batch;
          if (this.batchdetails.inProgress === 0) {
            this.location.back();
          }
          this.eventid = this.batchdetails.event_id;
          this.batchid = this.batchdetails.batches_id;
          this.batchuuid = this.batchdetails.uuid;
          for (var i = 0; i <= res.metaData.length - 1; i++) {
            var arrays: any[] = res['metaData'][i].Registration.User;
            this.userList.push(arrays);
          }
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.SUCCESS;
          let timeString = this.batchdetails.start_time;
          const H = +timeString.substr(0, 2);
          let endtimeString = this.batchdetails.end_time;
          const EM = +endtimeString.substr(3, 4);
          this.batchdetails.start_time_new = this.timeformat(this.batchdetails.start_time);
          this.batchdetails.end_time_new = this.timeformat(this.batchdetails.end_time);
          this.batchdetails.hour = H;
          this.batchdetails.min = EM;
        } else {
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.FAILED;
        }
      },
        (err) => {
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.FAILED;
          this.cdRef.markForCheck();
        });
    }
  }
  //time format coversion from 24 hrs to 12 hrs and adding am and pm after the time
  timeformat(k) {
    let timeString = k;
    const H = +timeString.substr(0, 2);
    const h = (H % 12) || 12;
    const ampm = H < 12 ? ' AM' : ' PM';
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }
  //To save the attendance tracker
  save(item) {
    const useruuid = this.context.getData(ContextDataItem.USER_ID);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todays = yyyy + '-' + mm + '-' + dd;
    if (item) {
      const updatable = {
        batchId: this.batchid,
        eventId: this.eventid,
        trainerId: useruuid,
        users: item,
        date: todays
      };
      this.attendenceService.createattendance(updatable ? updatable : '').subscribe(res => {
        this.snackbar.snackbars("Attendance has been submitted successfully", "info-snackbar");
        setTimeout(() => {
          this.location.back();
        }, 3000);
        this.cdRef.markForCheck();
      }, err => {
        this.snackbar.snackbars("Failed", "error-snackbar");
      });
    }
  }
  //to end the session
  sessionclicked() {
    const update = {
      inProgress: 0
    }
    this.batchservice.editbatch(this.batchid ? this.batchid : '', update ? update : '').subscribe((res) => {
      this.snackbar.snackbars("Session ended successfully", "info-snackbar");
      this.location.back();
      this.cdRef.markForCheck();
    }, err => {
      this.snackbar.snackbars("Cannot end session", "error-snackbar");
      this.cdRef.markForCheck();
    });
  }
}