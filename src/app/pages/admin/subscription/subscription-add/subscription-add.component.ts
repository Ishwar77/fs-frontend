import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Inject,
} from "@angular/core";
import { EventService } from "src/app/services/event";
import {
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { SubscriptionModel } from "src/app/models/subscription";
import { SubscriptionService } from "src/app/services/subscription";
import { SubscriptionDataManage } from "../subscription-manage/subscription-manage.component";
import { ApplicationContext } from 'src/app/util/context/applicationContext';

@Component({
  selector: "app-subscription-add",
  templateUrl: "./subscription-add.component.html",
  styleUrls: ["./subscription-add.component.scss"],
})
export class SubscriptionAddComponent implements OnInit {
  menus: any = [];
  id: any;
  public selectedFile: File = null;
  imgURL: any;
  public _data: SubscriptionModel = {};
  @Input()
  get data() {
    return this._data;
  }
  set data(d) {
    this._data = d;
    this.cdref.markForCheck();
  }

  constructor(
    private cdref: ChangeDetectorRef,
    private eventservice: EventService,
    public dialogRef: MatDialogRef<SubscriptionAddComponent>,
    private snackbar: MatSnackBar,
    private subscriptionservice: SubscriptionService,
    @Inject(MAT_DIALOG_DATA) public item: SubscriptionDataManage,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    this.geteventsmaster();
  }

  addsubscription() {
    const updatable = {
      event_id: +this.item.eventID,
      days: this.data.days + "",
      amount: this.data.amount + "",
      tax: this.data.tax + "",
      batch_count:this.data.batchs,
      duration: 0
    };
    this.subscriptionservice.addsubscription(updatable).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackbar.open("Subscription has been Added Successfully", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["sucess-snackbar"],
        });
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.open("Please provide proper details", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
      }
    );
  }

  geteventsmaster() {
    this.eventservice.eventmaster().subscribe((res) => {
      this.menus = res["metaData"];
      this.cdref.markForCheck();
    });
  }

  reset() {
    SubscriptionModel.clearall(this.data);
    this.cdref.markForCheck();
  }

  onlyNumbers(event) {
    this.context.onlyPositiveNumbers(event);
  }
}