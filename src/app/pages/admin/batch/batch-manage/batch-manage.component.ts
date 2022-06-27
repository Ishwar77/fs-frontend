import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  Input,
} from "@angular/core";
import { PageStatus, PageAction, PageManager } from "src/app/models/page";
import {
  MatSnackBar,
  MatDialog,
  MatSort,
  MatPaginator,
  MatTableDataSource,
} from "@angular/material";
import { Router } from "@angular/router";
import { SubscriptionService } from "src/app/services/subscription";
import { SubscriptionModel } from "src/app/models/subscription";
import {
  ApplicationContext,
  ContextDataItem,
} from "src/app/util/context/applicationContext";
import { BatchEditComponent } from '../batch-edit/batch-edit.component';
import { BatchAddComponent } from '../batch-add/batch-add.component';
import { BatchService } from 'src/app/services/batch';
import { ExcelService } from 'src/app/services/excel';

export interface BatchDataManage {
  batches_id: any;
  starttime: any;
  endtime: any;
  size: any;
  frequency: any;
  created_at: any;
  eventID: any;
  subsID: any;
  freconfig: any;
  available: any;
  limit: any;
}

@Component({
  selector: "app-batchmanage",
  templateUrl: "./batch-manage.component.html",
  styleUrls: ["./batch-manage.component.scss"],
})
export class BatchmanageComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];
  subs: any = [];
  dialoguedata: any;
  eventId: any;
  uuid: any;
  eventname: any;
  loadingvalue: boolean = true;
  deletedata: any;
  subid: any;
  displayedColumns: string[] = [
    "si",
    "start",
    "end",
    "size",
    "date",
    "frequency",
    "action"
  ];
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
    private snackbar: MatSnackBar,
    private route: Router,
    private batchservice: BatchService,
    private context: ApplicationContext,
    private excelservice: ExcelService
  ) { }

  ngOnInit() {
    this.eventId = this.context.getData(ContextDataItem.EVENT_ID);
    this.eventname = this.context.getData(ContextDataItem.EVENT_NAME);
    this.subid = this.context.getData(ContextDataItem.SUBSCRIPTION_ID);
    this.uuid = this.context.getData(ContextDataItem.SUBUUID);
    if (this.eventId && this.uuid) {
      this.getsubscriptionbyeventid();
    } else {
      this.route.navigate(["admin/event-manage"]);
    }
  }

  getsubscriptionbyeventid() {
    this.batchservice.batchbasedonsubs(this.uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.subs = res["metaData"];
          this.dataSource = new MatTableDataSource<BatchDataManage>(this.subs);
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

  addbatch() {
    const dialogref = this.dialog.open(BatchAddComponent, {
      data: {
        eventID: this.eventId,
        subsID: this.subid
      },
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
      this.batchservice.deletebatch(data.batches_id).subscribe(
        (res) => {
          setTimeout(() => {
            this.getsubscriptionbyeventid();
            this.snackbar.open("Deleted Successfully", "", {
              duration: 3000,
              verticalPosition: "top",
              panelClass: ["sucess-snackbar"],
            });
          }, 1000);
        },
        (err) => {
          this.snackbar.open("Cannot Delete the Batch", "", {
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

  eventsubs(data) {
    const dialogref = this.dialog.open(BatchEditComponent, {
      data: {
        batches_id: data.batches_id,
        starttime: data.start_time,
        endtime: data.end_time,
        size: data.batch_size,
        frequency: data.frequency,
        freconfig: data.frequency_config,
        available: data.available_seats,
        limit: data.has_limit
      },
    });
    dialogref.afterClosed().subscribe((res) => {
      this.getsubscriptionbyeventid();
    });
  }
  //export feature
  ExportTOExcel() {
    if (this.subs && this.subs.length) {
      this.excelservice.exportAsExcelFile(this.subs, 'Batches');
      this.cdref.markForCheck();
    }
  }
}
