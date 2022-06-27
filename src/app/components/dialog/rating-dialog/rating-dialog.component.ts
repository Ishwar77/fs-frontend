import { Component, OnInit, ChangeDetectorRef, Inject, Input } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ContextDataItem, ApplicationContext } from 'src/app/util/context/applicationContext';
import { LoginComponent } from '../../Authentication/login/login.component';
import { RatingService } from 'src/app/services/ratings';
import { trainerdata } from 'src/app/pages/trainer-public/trainer-public.component';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {
  @Input() public eventname: any;
  facebook;
  twitter;
  linkedin;
  whatsapp;
  emailstring;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  public url: any;
  constructor(
    private snackbar: SnackbarService,
    private cdref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<RatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public item: trainerdata,
    private context: ApplicationContext,
    private dailog: MatDialog,
    private ratingservice: RatingService
  ) { }

  ngOnInit() {
  }
  //to get the rating value
  countStar(star) {
    this.selectedValue = star;
    this.cdref.markForCheck();
  }
  //submit the rating
  submitrating(obj) {
    const loggedin = this.context.getData(ContextDataItem.LOGGEDIN);
    if (!loggedin) {
      this.dialogRef.close();
      const dialogref = this.dailog.open(LoginComponent);
      dialogref.afterClosed().subscribe((result) => {
        if (result && result.message) {
          const userId = this.context.getData(ContextDataItem.USER_ID);
          this.getratings(userId, obj);
        }
      });
    } else {
      const userId = this.context.getData(ContextDataItem.USER_ID);
      this.getratings(userId, obj);
    }
  }
  //create a rating
  ratingcreate(userId, obj) {
    const update = {
      userId: userId ? userId : '',
      trainerId: this.item ? this.item.trainer : '',
      ratings: obj
    }
    this.ratingservice.createratings(update ? update : '').subscribe(res => {
      if (res && res.metaData && res.metaData.length) {
        this.snackbar.snackbars("Ratings submitted successfully", "info-snackbar");
        this.dialogRef.close({
          data: res.metaData
        });
      }
    }, err => {
      this.dialogRef.close();
    })
  }
  //get user ratings
  getratings(userId, obj) {
    this.ratingservice.getbyuser(userId).subscribe(res => {
      if (res && res.metaData && res.metaData.length) {
        this.updaterating(userId, obj);
      } else {
        this.ratingcreate(userId, obj);
      }
    }, err => {
    });
    this.cdref.markForCheck();
  }
  //update the rating
  updaterating(userId, obj) {
    const update = {
      ratings: obj ? obj : ''
    }
    this.ratingservice.updaterating(userId, update).subscribe(res => {
      if (res && res['metaData']) {
        this.snackbar.snackbars("Updated ratings successfully", "info-snackbar");
        this.dialogRef.close({
          data: res.metaData
        });
      }
    }, err => {
      this.dialogRef.close();
    });
    this.cdref.markForCheck();
  }
}
