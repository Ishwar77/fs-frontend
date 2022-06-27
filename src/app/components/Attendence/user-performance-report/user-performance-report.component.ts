import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShareDialogComponent } from '../../dialog/share-dialog/share-dialog.component';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';

export interface meetingdata {
  link: any;
}

@Component({
  selector: 'app-user-performance-report',
  templateUrl: './user-performance-report.component.html',
  styleUrls: ['./user-performance-report.component.scss']
})
export class UserPerformanceReportComponent implements OnInit {
  @Input() public model: any;
  public link: any;
  constructor(
    private dialog: MatDialog,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    var link = JSON.parse(this.model.meeting_links);
    if (this.model.meeting_links) {
      this.link = link[0].link;
    }
  }
  //open the share dialog
  openDialog() {
    if (this.link) {
      this.dialog.open(ShareDialogComponent, {
        width: '500px', data: {
          link: this.link
        }
      });
    }
  }
}