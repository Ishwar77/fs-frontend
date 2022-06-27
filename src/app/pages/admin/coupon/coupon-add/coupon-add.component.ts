import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Inject,
} from "@angular/core";

import {
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";

import { CoupanService } from "src/app/services/coupan";
import { CouponModel } from "src/app/models/coupon";
import { ApplicationContext } from 'src/app/util/context/applicationContext';
import { SubscriptionDataManage } from '../../subscription/subscription-manage/subscription-manage.component';

@Component({
  selector: "app-subscription-add",
  templateUrl: "./coupon-add.component.html",
  styleUrls: ["./coupon-add.component.scss"],
})
export class CouponAddComponent implements OnInit {
  favoriteSeason: string = 'Public';
  seasons: string[] = ['Public', 'Private'];
  menus: any = [];
  id: any;
  public selectedFile: File = null;
  imgURL: any;
  public _data: CouponModel = {};
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
    public dialogRef: MatDialogRef<CouponAddComponent>,
    private snackbar: MatSnackBar,
    private couponservice: CoupanService,
    @Inject(MAT_DIALOG_DATA) public item: SubscriptionDataManage,
    private context: ApplicationContext
  ) { }

  ngOnInit() { }

  addcoupon() {
    const updatable = {
      event_id: this.item.eventID,
      title: this.data.title,
      discount_percent: this.data.discount_percent,
      max_discount_amount: this.data.max_discount_amount,
      max_usage_count: this.data.max_usage_count,
      expiry: this.data.expiry,
      isPrivate: 0
    };
    if (this.favoriteSeason === 'Private') {
      updatable.isPrivate = 1;
    }
    this.couponservice.addcoupon(updatable).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackbar.open("Coupon has been Added Successfully", "", {
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

  reset() {
    CouponModel.clearall(this.data);
    this.cdref.markForCheck();
  }

  onlyNumbers(event) {
    this.context.onlyPositiveNumbers(event);
  }
}