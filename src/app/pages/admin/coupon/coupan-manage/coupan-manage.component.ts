import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatSnackBar,
} from "@angular/material";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import { Router } from "@angular/router";
import { CoupanService } from "src/app/services/coupan";
import {
  ApplicationContext,
  ContextDataItem,
} from "src/app/util/context/applicationContext";
import { CouponAddComponent } from "../coupon-add/coupon-add.component";
import { CouponEditComponent } from "../edit-coupon/edit-coupon.component";
import { ExcelService } from 'src/app/services/excel';

export interface CoupanDataManage {
  event_id: any;
  title: any;
  discount_percent: any;
  max_discount_amount: any;
  max_usage_count: any;
  expiry: any;
  couponidvalue: any;
  eventidvalue: any;
  titlevalue: any;
  disamount: any;
  percentvalue: any;
  countvalue: any;
  expiryvalue: any;
}

@Component({
  selector: "app-coupan-manage",
  templateUrl: "./coupan-manage.component.html",
  styleUrls: ["./coupan-manage.component.scss"],
})
export class CoupanManageComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];
  subs: any = [];
  dialoguedata: any;
  eventId: any;
  uuid: any;
  eventname: any;
  loadingvalue: boolean = true;
  deletedata: any;
  displayedColumns: string[] = [
    "si",
    "title",
    "percent",
    "amount",
    "count",
    "credate",
    "expdate", "type",
    "action",
  ];
  dataSource; // = new MatTableDataSource<CoupanDataManage>(this.subs);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private cdref: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private route: Router,
    private coupservice: CoupanService,
    private context: ApplicationContext,
    private excelservice: ExcelService
  ) { }

  ngOnInit() {
    this.eventname = this.context.getData(ContextDataItem.EVENT_NAME);
    this.eventId = this.context.getData(ContextDataItem.EVENT_ID);
    this.uuid = this.context.getData(ContextDataItem.EventUUID);
    if (this.uuid) {
      this.getcouponbyeventid();
    } else {
      this.route.navigate(["admin/event-manage"]);
    }
    this.cdref.markForCheck();
  }

  getcouponbyeventid() {
    this.coupservice.getallprivateandpubliccoupons(this.uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.subs = res["metaData"];
          this.dataSource = new MatTableDataSource<CoupanDataManage>(this.subs);
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
      }
    );
  }

  addsubsciption() {
    const dialogref = this.dialog.open(CouponAddComponent, {
      data: { eventID: this.eventId },
    });
    dialogref.afterClosed().subscribe((res) => {
      this.getcouponbyeventid();
    });
  }

  eventAdd() { }

  eventinfo(element) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deletecoupon(data) {
    if (data) {
      this.coupservice.deletecoupon(data.coupon_id).subscribe(
        (res) => {
          setTimeout(() => {
            this.getcouponbyeventid();
            this.snackbar.open("Coupon has been Deleted Successfully", "", {
              duration: 3000,
              verticalPosition: "top",
              panelClass: ["sucess-snackbar"],
            });
          }, 1000);
        },
        (err) => {
          this.snackbar.open("Coupon cannot be deleted", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["error-snackbar"],
          });
        }
      );
    } else {
      return false;
    }
  }

  eventcoupon(data) {
    const dialogref = this.dialog.open(CouponEditComponent, {
      data: {
        couponidvalue: data.coupon_id,
        eventidvalue: data.event_id,
        titlevalue: data.title,
        percentvalue: data.discount_percent,
        disamount: data.max_discount_amount,
        countvalue: data.max_usage_count,
        expiryvalue: data.expiry,
      },
    });
    dialogref.afterClosed().subscribe((res) => {
      this.getcouponbyeventid();
    });
  }
  //export feature
  ExportTOExcel() {
    if (this.subs && this.subs.length) {
      this.excelservice.exportAsExcelFile(this.subs, 'Coupons');
      this.cdref.markForCheck();
    }
  }
}
