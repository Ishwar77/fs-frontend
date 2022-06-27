import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from "@angular/core";
import { PageStatus, PageAction, PageManager } from "src/app/models/page";
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { SubscriptionService } from "src/app/services/subscription";
import { SubscriptionModel } from "src/app/models/subscription";
import { ApplicationContext, ContextDataItem } from "src/app/util/context/applicationContext";
import { SubscriptionAddComponent } from "../subscription-add/subscription-add.component";
import { SubscriptionEditComponent } from "../edit-subscription/edit-subscription.component";
import { SnackbarService } from 'src/app/services/snackbar';
import { ExcelService } from 'src/app/services/excel';

export interface SubscriptionDataManage {
  subscription_id: any;
  event_id: any;
  days: any;
  amount: any;
  tax: any;
  updated_at: any;
  isActive: any;
  eventID: any;
  subsid: any;
  eventid: any;
  dayvalue: any;
  taxvalue: any;
  amountvalue: any;
  batchcount: any;
}

@Component({
  selector: "app-subscription-manage",
  templateUrl: "./subscription-manage.component.html",
  styleUrls: ["./subscription-manage.component.scss"],
})
export class SubscriptionManageComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  subs: any = [];
  eventId: any;
  uuid: any;
  eventname: any;
  displayedColumns: string[] = ["si", "days", "amount", "tax", "date", "batchcount", "Action", "batch"];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
    private dialog: MatDialog,
    private cdref: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private route: Router,
    private subsservice: SubscriptionService,
    private context: ApplicationContext,
    private excelservice: ExcelService
  ) { }

  ngOnInit() {
    this.eventname = this.context.getData(ContextDataItem.EVENT_NAME);
    this.eventId = this.context.getData(ContextDataItem.EVENT_ID);
    this.uuid = this.context.getData(ContextDataItem.EventUUID);
    if (this.uuid) {
      this.getsubscriptionbyeventid();
    } else {
      this.route.navigate(["admin/event-manage"]);
    }
  }

  getsubscriptionbyeventid() {
    this.subsservice.subscriptionByID(this.uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.subs = res["metaData"];
          this.dataSource = new MatTableDataSource<SubscriptionDataManage>(
            this.subs
          );
          this.dataSource.paginator = this.paginator;
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
    const dialogref = this.dialog.open(SubscriptionAddComponent, {
      data: { eventID: this.eventId },
    });
    dialogref.afterClosed().subscribe((res) => {
      this.getsubscriptionbyeventid();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletsubs(data) {
    if (data) {
      this.subsservice.deletesubscription(data.subscription_id).subscribe(
        (res) => {
          this.snackbar.snackbars("Deleted Successfully", "info-snackbar");
        },
        (err) => {
          this.snackbar.snackbars("Cannot Delete this Subscription", "error-snackbar");
        }
      );
    } else {
      return false;
    }
  }

  eventsubs(data) {
    const dialogref = this.dialog.open(SubscriptionEditComponent, {
      data: {
        subsid: +data.subscription_id,
        eventid: +data.event_id,
        dayvalue: +data.days,
        taxvalue: +data.tax,
        amountvalue: +data.amount,
        batchcount: +data.batch_count
      },
    });
    dialogref.afterClosed().subscribe((res) => {
      this.getsubscriptionbyeventid();
    });
  }

  movetobatch(data) {
    if (data) {
      this.context.setData(ContextDataItem.EVENT_ID, this.eventId);
      this.context.setData(ContextDataItem.SUBSCRIPTION_ID, data.subscription_id);
      this.context.setData(ContextDataItem.SUBUUID, data.uuid);
      this.context.setData(ContextDataItem.EVENT_NAME, this.eventname);
      this.route.navigate([`admin/batch-manage`]);
    } else {
      return false;
    }
  }
  //export feature
  ExportTOExcel() {
    if (this.subs && this.subs.length) {
      this.excelservice.exportAsExcelFile(this.subs, 'Subscriptions');
      this.cdref.markForCheck();
    }
  }
}