import { Component, OnInit, ChangeDetectorRef, Inject, Input } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar';
import { ApplicationContext } from 'src/app/util/context/applicationContext';
import { CoupanService } from 'src/app/services/coupan';
import { RewardService } from 'src/app/services/rewards';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RewarddataManage } from '../../profile-section/reedeemHistory/reedeem-history.component';
import { CouponModel } from 'src/app/models/coupon';

@Component({
  selector: 'app-coupan-redem',
  templateUrl: './coupan-redem.component.html',
  styleUrls: ['./coupan-redem.component.scss']
})
export class CoupanRedemComponent implements OnInit {
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
    private snackbar: SnackbarService,
    private context: ApplicationContext,
    private couponservice: CoupanService,
    private rewardservice: RewardService,
    @Inject(MAT_DIALOG_DATA) public item: RewarddataManage,
    public dialogref: MatDialogRef<CoupanRedemComponent>
  ) { }

  ngOnInit() {
    if (!this.item) {
      this.dialogref.close();
    }
  }
  //private coupon
  privatecoupon() {
    const updatable = {
      event_id: this.item.menus.Event.event_id,
      title: this.data.title,
      discount_percent: this.data.discount_percent,
      max_discount_amount: this.data.max_discount_amount,
      max_usage_count: 1,
      expiry: this.data.expiry,
      isPrivate: 1
    };
    this.couponservice.addcoupon(updatable).subscribe(
      (res) => {
        this.updaterewards(this.item && this.item.menus ? this.item.menus.user_id : '', updatable.discount_percent, updatable.title, this.item && this.item.menus ? this.item.menus.trainer_id : '');
        this.snackbar.snackbars("Coupon has been Added Successfully", "info-snackbar");
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.snackbars("Please provide proper details", "error-snackbar");
      }
    );
  }
  //update rewards
  updaterewards(id, value, name, trainer) {
    const update = {
      userId: id ? id : '',
      value: value ? value : '',
      couponname: name ? name : ''
    }
    this.rewardservice.updateservice(update ? update : '').subscribe(res => {
      this.dialogref.close({
        data: trainer
      })
      this.cdref.markForCheck();
    });
  }
}