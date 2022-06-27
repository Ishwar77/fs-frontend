import { Component, OnInit, ChangeDetectorRef, Inject } from "@angular/core";
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { SubscriptionService } from "src/app/services/subscription";
import { SubscriptionDataManage } from "../subscription-manage/subscription-manage.component";
import { ApplicationContext } from 'src/app/util/context/applicationContext';

@Component({
  selector: "app-edit-subscription",
  templateUrl: "./edit-subscription.component.html",
  styleUrls: ["./edit-subscription.component.scss"],
})
export class SubscriptionEditComponent implements OnInit {
  menus: any = [];
  id: any;
  public selectedFile: File = null;
  imgURL: any;

  constructor(
    private cdref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<SubscriptionEditComponent>,
    private snackbar: MatSnackBar,
    private subscriptionservice: SubscriptionService,
    @Inject(MAT_DIALOG_DATA) public item: SubscriptionDataManage,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
   }

  editsubscription() {
    const updatable = {
      event_id: +this.item.eventid,
      days: this.item.dayvalue + "",
      amount: this.item.amountvalue + "",
      tax: this.item.taxvalue + "",
      batch_count: +this.item.batchcount
    };
    this.subscriptionservice
      .updatesubscription(this.item.subsid, updatable)
      .subscribe(
        (res) => {
          this.dialogRef.close();
          this.snackbar.open("Updated Successfully", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["sucess-snackbar"],
          });
          this.cdref.markForCheck();
        },
        (err) => {
          this.snackbar.open("Error", "", { duration: 3000 });
        }
      );
  }

  onlyNumbers(event) {
    this.context.onlyPositiveNumbers(event);
  }
}