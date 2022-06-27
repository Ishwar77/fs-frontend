import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
} from "@angular/core";
import {
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { CoupanService } from "src/app/services/coupan";
import { CoupanDataManage } from "../coupan-manage/coupan-manage.component";
import { formatDate } from "@angular/common";
import { ApplicationContext } from 'src/app/util/context/applicationContext';

@Component({
  selector: "app-edit-coupon",
  templateUrl: "./edit-coupon.component.html",
  styleUrls: ["./edit-coupon.component.scss"],
})
export class CouponEditComponent implements OnInit {
  menus: any = [];
  id: any;
  public selectedFile: File = null;
  imgURL: any;

  constructor(
    private cdref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CouponEditComponent>,
    private snackbar: MatSnackBar,
    private couponservice: CoupanService,
    @Inject(MAT_DIALOG_DATA) public item: CoupanDataManage,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    this.item.expiryvalue = formatDate(
      this.item.expiryvalue,
      "dd/MM/yyyy",
      "en"
    );
  }

  editsubscription() {
    const updatable = {
      event_id: this.item.eventidvalue,
      title: this.item.titlevalue,
      discount_percent: this.item.percentvalue,
      max_discount_amount: this.item.disamount,
      max_usage_count: this.item.countvalue,
      expiry: this.item.expiryvalue,
    };
    this.couponservice
      .updatecoupon(this.item.couponidvalue, updatable)
      .subscribe(
        (res) => {
          this.dialogRef.close();
          this.snackbar.open("Updated successfully", "", { duration: 3000 });
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