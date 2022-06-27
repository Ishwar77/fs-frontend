import { Component, OnInit, ChangeDetectorRef, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { BatchService } from "src/app/services/batch";
import { PageManager } from "src/app/models/page";
import { SnackbarService } from "src/app/services/snackbar";

@Component({
  selector: "app-batch-update",
  templateUrl: "./batch-update.component.html",
  styleUrls: ["./batch-update.component.scss"],
})
export class BatchUpdateComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  batcheventDetails: any;
  selectedBatchTime: any = {};

  constructor(
    private cdref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<BatchUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public eventDetails: any,
    private batchServies: BatchService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    this.loadInit();
  }
  //Initially load for getting the batches list in the dropdown
  loadInit() {
    const subscriptionUUID = this.eventDetails && this.eventDetails.subscriptionuuid ? this.eventDetails.subscriptionuuid : null;
    this.batchServies.getbatchBySubscription(subscriptionUUID ? subscriptionUUID : '').subscribe((ele) => {
      this.batcheventDetails = ele ? ele["metaData"] : null;
      this.batcheventDetails = this.batcheventDetails && this.batcheventDetails.map((k) => {
        return Object.assign({}, k, {
          start_time_new: this.timeformat(k.start_time),
          end_time_new: this.timeformat(k.end_time),
        });
      });
      if (this.batcheventDetails) {
        this.loadInitActions();
      }
    });
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
  //To separate the start time and the end time.
  loadInitActions() {
    if (this.batcheventDetails) {
      this.batcheventDetails.map(batches => {
        if (batches.start_time_new && batches.end_time_new) {
          batches['label_batch'] = `${batches.start_time_new} - ${batches.end_time_new}`;
        }
        batches['label_day'] = '';
        try {
          batches['frequency_config_parsed'] = JSON.parse(JSON.parse(batches['frequency_config']));
        } catch (e) { }
      });
    }
  }
  //when time dropdown is clicked
  sessionClick(item) {
    if (item["has_limit"] && !item["available_seats"]) {
      this.snackbar.snackbars("There are no slots in this batch", "info-snackbar");
      return;
    }
    this.selectedBatchTime = item;
    this.cdref.markForCheck();
  }
  //when days are selected
  chooseDays(item) {
    this.selectedBatchTime['label_day'] = item;
  }
  //update the batch time
  updateBatchTime() {
    if (this.eventDetails.batch_id === this.selectedBatchTime.batches_id) {
      this.snackbar.snackbars("Choose the different batch", "info-snackbar");
    } else {
      const updatable = {
        user_id: this.eventDetails.user_id,
        registration_id: this.eventDetails.registration_id,
        batch_id: this.selectedBatchTime.batches_id,
        day_of_week: this.selectedBatchTime.label_day,
        reg_batch_id: this.eventDetails.reg_batch_id,
      };
      if (!this.selectedBatchTime.label_day) {
        delete updatable.day_of_week;
      }
      this.batchServies.switchbatch(updatable ? updatable : '').subscribe((res) => {
        this.snackbar.snackbars("Batch Switch requested successfully, wait for the trainer approval", "info-snackbar");
        this.dialogRef.close({
          data: res.metaData
        });
      },
        (err) => {
          this.snackbar.snackbars("Can not Update the changes", "error-snackbar");
          this.dialogRef.close();
        });
      this.cdref.markForCheck();
    }
  }
}