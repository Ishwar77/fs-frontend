import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile';
import { PageStatus, PageAction, PageManager } from 'src/app/models/page';
import { SnackbarService } from 'src/app/services/snackbar';
import { ShareDialogComponent } from 'src/app/components/dialog/share-dialog/share-dialog.component';
import { MatDialog } from '@angular/material';
import { ApplicationContext, ContextDataItem, ContextActionListencer, ContextEvents } from 'src/app/util/context/applicationContext';
import { RatingService } from 'src/app/services/ratings';
import { RatingDialogComponent } from 'src/app/components/dialog/rating-dialog/rating-dialog.component';

export interface trainerdata {
  trainer: any;
}

@Component({
  selector: 'app-trainer-public',
  templateUrl: './trainer-public.component.html',
  styleUrls: ['./trainer-public.component.scss']
})
export class TrainerPublicComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  public menus: any = [];
  stars: number[] = [1, 2, 3, 4, 5];
  ratingvalue: any;
  trainerId: any;
  constructor(
    private cdref: ChangeDetectorRef,
    private router: ActivatedRoute,
    private profileservice: ProfileService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private context: ApplicationContext,
    private ratingservice: RatingService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    if (this.context.getData(ContextDataItem.TOKEN_KEY) && this.context.getData(ContextDataItem.TOKEN_VALUE)) {
      this.listentourl(); //call the event section when the token is generated
    }
    this.contextlistener(); //listen to context
  }
  //Listen to the context
  contextlistener() {
    this.context.listener.subscribe((res: ContextActionListencer) => {
      if (res.event === ContextEvents.VALUDE_CHANGED) {
        if (res.data && res.data.key && res.data.key === ContextDataItem.TOKEN_VALUE) { //to check whether token value exists
          this.listentourl();
          this.cdref.markForCheck();
        }
      }
    });
  }
  //listen to the url to get trainer name
  listentourl() {
    this.router.params.subscribe(res => {
      this.trainerinfo(res.name);
      this.cdref.markForCheck();
    });
  }
  //To open the share component dialog
  shareoption() {
    var url = window.location.href;
    if (url) {
      window.navigator.clipboard.writeText(url);
      this.snackbar.snackbars("Successfully Copied", "info-snackbar");
      this.cdref.markForCheck();
    }
  }
  //share dialog
  openDialog() {
    this.dialog.open(ShareDialogComponent, {
      width: '500px'
    });
  }
  //rating dialog
  ratingDialog() {
    const dialogref = this.dialog.open(RatingDialogComponent, {
      width: '500px',
      data: {
        trainer: this.trainerId
      }
    });
    dialogref.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.listentourl();
        this.cdref.markForCheck();
      }
    });
  }
  //To get trainer info based on name
  trainerinfo(name) {
    this.profileservice.getprofiledetailsbyname(name).subscribe((res) => {
      if (res["metaData"] && res["metaData"].length !== 0) {
        this.menus = res["metaData"];
        this.trainerId = this.menus ? this.menus.user_id : ''
        this.getratings(this.trainerId ? this.trainerId : '');
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
      });
  }
  //get rating based on trainerid
  getratings(trainerId) {
    this.ratingservice.getbytrainer(trainerId ? trainerId : '').subscribe(res => {
      var ratingarray: any = [];
      var reviewtotal: number = 0;
      if (res && res.metaData.length) {
        ratingarray = res['metaData'];
        for (let i = 0; i < ratingarray.length; i++) {
          if (ratingarray[i].ratings) {
            reviewtotal = reviewtotal + ratingarray[i].ratings;
            this.ratingvalue = Math.ceil(reviewtotal / (i + 1));
          }
        }
      }
    });
  }
}
