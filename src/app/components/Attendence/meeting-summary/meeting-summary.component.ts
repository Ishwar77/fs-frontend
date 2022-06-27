import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';

@Component({
  selector: 'app-meeting-summary',
  templateUrl: './meeting-summary.component.html',
  styleUrls: ['./meeting-summary.component.scss']
})
export class MeetingSummaryComponent implements OnInit {
  public eventname: any;
  public trainername: any;
  public link: any;
  public password: any;
  public timer: any;
  public hour: any;
  public min: any;
  time: any;
  @Input() public batchdetails: any;
  @Input() public totalusers: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private context: ApplicationContext
  ) { }


  ngOnInit() {
    this.eventname = this.context.getData(ContextDataItem.EVENT_NAME);
    this.trainername = this.context.getData(ContextDataItem.USER_NAME);
    var link = JSON.parse(this.batchdetails.meeting_links);
    if (this.batchdetails.meeting_links) {
      this.link = link[0].link;
      if (link[0].password) {
        this.password = link[0].password;
      }
    }
    this.gettimer();
    this.cdRef.markForCheck();
  }
  //countdown timer
  gettimer() {
    setInterval(() => {
      var d = new Date();
      var curr_hour = d.getHours();
      var curr_min = d.getMinutes();
      var curr_sec = d.getSeconds();
      this.time = curr_hour + ':' + curr_min;
      this.time = +this.time;
      this.hour = (+this.batchdetails.hour) - (+curr_hour);
      this.min = (+this.batchdetails.min) - (+curr_min);
    }, 1000);
  }
}