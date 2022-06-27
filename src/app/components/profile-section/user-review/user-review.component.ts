import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { ReviewService } from "src/app/services/review";
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { SnackbarService } from 'src/app/services/snackbar';
import { Router } from '@angular/router';

@Component({
  selector: "app-user-review",
  templateUrl: "./user-review.component.html",
  styleUrls: ["./user-review.component.scss"],
})
export class UserReviewComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  enableEdit: boolean = false;
  showview: boolean = false;
  reviewId;
  public enableEditIndex: any;
  items: any = [];
  current = 0;
  prev = -1;

  constructor(
    private cdRef: ChangeDetectorRef,
    private reviewservice: ReviewService,
    private context: ApplicationContext,
    private snackbarservice: SnackbarService,
    private route:Router
  ) { }

  ngOnInit() {
    var uuid = this.context.getData(ContextDataItem.UUID);
    this.getreview(uuid);
  }

  getreview(uuid) {
    this.reviewservice.reviewByuseruuId(uuid).pipe(debounceTime(300)).subscribe((res) => {
      if (res["metaData"] && res.metaData.length) {
        this.items = res["metaData"];
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.SUCCESS;
      } else {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
      }
      this.cdRef.markForCheck();
    }, (err) => {
      this.pageManager.status = PageStatus.READY;
      this.pageManager.action = PageAction.FAILED;
      this.cdRef.markForCheck();
    })
  }

  reviewSave(ItemData, i) {
    if (ItemData && this.enableEditIndex === i) {
      const updatable = {
        review: ItemData.review
      }
      this.reviewservice.updatereview(ItemData.uuid, updatable).subscribe(res => {
        if (res && res.metaData) {
          this.snackbarservice.snackbars("Updated Successfully", "info-snackbar");
          this.getreview(res.metaData.status.User.uuid);
          this.enableEditIndex = {};
          this.cdRef.markForCheck();
        }
      }, err => {
        this.snackbarservice.snackbars("Cannot Update the review", "error-snackbar");
        this.cdRef.markForCheck();
      });
    }
  }

  deletereview(reviewdata) {
    if (reviewdata) {
      this.reviewservice.deletereview(reviewdata.uuid).subscribe(res => {
        if (res && res.metaData) {
          this.snackbarservice.snackbars("Deleted Successfully", "info-snackbar");
          var uuid = this.context.getData(ContextDataItem.UUID);
          this.getreview(uuid);
          this.enableEditIndex = {};
          this.cdRef.markForCheck();
        }
      }, err => {
        this.snackbarservice.snackbars("Cannot delete the review", "error-snackbar");
        this.cdRef.markForCheck();
      });
    }
  }

  routetoevent(event) {
    this.route.navigate([`event/${event.Event.uuid}`])
  }
}
