import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackbarService } from 'src/app/services/snackbar';
import { batchdetails } from 'src/app/pages/trainer/batch-manage/batch-manage.component';
import { BatchService } from 'src/app/services/batch';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { previewdata } from 'src/app/pages/user/main/preview-component';

@Component({
  selector: 'app-meeting-dailog',
  templateUrl: './meeting-dailog.component.html',
  styleUrls: ['./meeting-dailog.component.scss']
})

export class MeetingDailogComponent implements OnInit {
  enableEdit: boolean = false;
  hide = true;
  chide = true;
  link: any;
  userrole: any;
  password: any;
  constructor(
    private cdref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<MeetingDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public item: batchdetails,
    @Inject(MAT_DIALOG_DATA) public preview: previewdata,
    private snackbar: SnackbarService,
    private batchservice: BatchService,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
    if (this.preview && this.preview.data && this.preview.data.link && this.userrole == 3) {
      this.link = this.preview.data.link;
      this.cdref.markForCheck();
    }
    if (this.item && this.item.batch && this.item.batch.meeting_links) {
      var link = JSON.parse(this.item.batch.meeting_links);
      if (this.item.batch.meeting_links) {
        this.link = link[0].link;
        if (link[0].password) {
          this.password = link[0].password;
        }
        this.cdref.markForCheck();
      } else {
        this.reset();
        this.cdref.markForCheck();
      }
    }
  }
  //To reset
  reset() {
    this.link = '';
    this.password = '';
  }
  //To update the batch meeting links
  update() {
    if (this.userrole == 3 && this.preview && this.preview.data.link) {
      window.open(this.preview.data.link, "_blank");
    }
    if (this.userrole == 6) {
      var update: any;
      if (this.password) {
        update = {
          meeting_links: JSON.stringify([{ link: this.link, password: this.password }])
        }
      } else {
        update = {
          meeting_links: JSON.stringify([{ link: this.link }])
        }
      }
      this.batchservice.editbatch(this.item.batch.batches_id, update).subscribe(res => {
        this.cdref.markForCheck();
        this.dialogRef.close({
          id: this.item.batch.Subscription.uuid
        })
      }, err => {
        this.dialogRef.close({
          id: this.item.batch.Subscription.uuid
        })
        this.cdref.markForCheck();
      });
      if (this.link) {
        window.open(this.link, "_blank");
      }
    }
  }
  //copy the meeting link
  copyinputmessage() {
    if (this.link) {
      window.navigator.clipboard.writeText(this.link);
      this.snackbar.snackbars("Successfully Copied the Meeting Link", "info-snackbar");
      this.cdref.markForCheck();
    }
  }
}
