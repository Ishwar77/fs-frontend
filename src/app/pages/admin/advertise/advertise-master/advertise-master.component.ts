import { Component, OnInit, Input, ChangeDetectorRef, Inject } from "@angular/core";
import { AdvertiseModel } from "src/app/models/advertise";
import { AdvertiseService } from "src/app/services/advertsise";
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { editAdvertiseData } from "../advertise-main/advertise-main.component";
import { SnackbarService } from 'src/app/services/snackbar';

@Component({
  selector: "app-advertise-master",
  templateUrl: "./advertise-master.component.html",
  styleUrls: ["./advertise-master.component.scss"],
})
export class AdvertiseMasterComponent implements OnInit {
  editable: boolean = false;
  advertiseMasterID: any;
  public _data: AdvertiseModel = {};
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
    private advertseAdd: AdvertiseService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AdvertiseMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public editAdv: editAdvertiseData
  ) { }

  ngOnInit() {
    this.editable = this.editAdv.editable;
    this.cdref.markForCheck();
  }

  AdvertiseAdd() {
    const updatable = {
      spot_name: this.data && this.data.name ? this.data.name : '',
      spot_days: this.data && this.data.days ? this.data.days : '',
      spot_amount: this.data && this.data.amount ? this.data.amount : '',
    };
    this.advertseAdd.advertiseMasterAdd(updatable ? updatable : '').subscribe(res => {
      if (res && res["metaData"]) {
        this.dialogRef.close({
          data: true
        });
        this.snackbar.snackbars("Subscription has been Added Successfully", "info-snackbar");
        this.cdref.markForCheck();
      }
    }, (err) => {
      this.snackbar.snackbars("Please provide proper details", "error-snackbar");
    }
    );
  }

  AdvertiseUpdate() {
    this.dialogRef.close({
      name: this.editAdv.obj.spot_name,
      days: this.editAdv.obj.spot_days,
      amount: this.editAdv.obj.spot_amount,
      id: this.editAdv.obj.spot_number
    });
  }
}