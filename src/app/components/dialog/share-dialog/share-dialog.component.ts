import { Component, OnInit, ChangeDetectorRef, Inject, Input } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { meetingdata } from '../../Attendence/user-performance-report/user-performance-report.component';
import { ContextDataItem, ApplicationContext } from 'src/app/util/context/applicationContext';
import { Router } from '@angular/router';
import { invitedata } from '../../profile-section/profile/profile.component';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {
  @Input() public eventname: any;
  facebook;
  twitter;
  linkedin;
  whatsapp;
  emailstring;
  public url: any;
  constructor(
    private snackbar: SnackbarService,
    private cdref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public item: meetingdata,
    @Inject(MAT_DIALOG_DATA) public invite: invitedata,
    private context: ApplicationContext,
    private route: Router
  ) { }

  ngOnInit() {
    var name = this.context.getData(ContextDataItem.USER_NAME);
    if (this.item === null) {
      if (this.invite === null) {
        this.eventname = this.context.getData(ContextDataItem.EVENT_NAME);
        this.url = "https://thefitsocials.com/" + "%23" + this.route.url;
        this.emailstring = "mailto:?Subject=Fit Socials Event : " + this.eventname + "&body=Hello %0D%0D" + window.location.href + "%0D %0DThank you %0D" + (name ? name : '');
        this.facebook = "https://www.facebook.com/sharer.php?u=" + this.url;
        this.twitter = "https://twitter.com/intent/tweet?url=" + this.url;
        this.linkedin = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.url;
      } else {
        this.item = this.invite;
        this.invites(this.item);
        this.cdref.markForCheck();
      }
    } else {
      this.invites(this.item);
      this.cdref.markForCheck();
    }
  }
  //invites
  invites(item) {
    this.url = item.link;
    this.emailstring = "mailto:?Subject=" + "&body=Hello %0D%0D" + this.url + "%0D %0DThank you %0D" + (name ? name : '');
    this.facebook = "https://www.facebook.com/sharer.php?u=" + this.url;
    this.twitter = "https://twitter.com/intent/tweet?url=" + this.url;
    this.linkedin = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.url;
  }
  shareevent() {
    var url = window.location.href;
    if (this.item && this.item.link) {
      window.navigator.clipboard.writeText(this.item.link);
      this.snackbar.snackbars("Successfully Copied the Link", "info-snackbar");
      this.cdref.markForCheck();
    } else {
      window.navigator.clipboard.writeText(url ? url : '');
      this.snackbar.snackbars("Successfully Copied the Link", "info-snackbar");
      this.cdref.markForCheck();
    }
  }
}
