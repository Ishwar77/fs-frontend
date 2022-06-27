import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { MatTableDataSource, MatDialog, MatDialogConfig, MatPaginator, MatSort } from "@angular/material";
import { EventService } from "src/app/services/event";
import { Router } from "@angular/router";
import { EventDelete } from "../event-delete/event-delete";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import { ApplicationContext, ContextDataItem, } from "src/app/util/context/applicationContext";
import { ExtraInfo } from '../extra-info/extra-info';
import { ProfileService } from 'src/app/services/profile';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { EventAddComponent } from '../event-add/event-add.component';
import { TrainerInfo } from '../../trainer/trainer-info/trainer-info';
import { SnackbarService } from 'src/app/services/snackbar';
import { ExcelService } from 'src/app/services/excel';
import { ExportService } from 'src/app/services/export';
export interface EventDataManage {
  id: string;
  name: string;
  description: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
  price: number;
  period: number;
  type_id: string;
  delid: any;
  instructor_id: any;
}
export interface Trainerdata {
  name: any;
  email: any;
  mobile: any;
  dob: any;
  gender: any;
  registered: any;
}
export interface extradata {
  id: any;
  trainer: any;
  image: any;
  start_date: any;
  end_date: any;
  start_time: any;
  end_time: any;
  description: any;
  period: any;
  link: any;
  created: any;
  masterid: any;
  price: any;
}

@Component({
  selector: "app-eventmanage",
  templateUrl: "./eventmanage.component.html",
  styleUrls: ["./eventmanage.component.scss"],
})
export class EventmanageComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  fileName = 'eventRecord.xlsx';
  menus: any = [];
  inactivemenus: any = [];
  activeSubscription: any = [];
  inactiveSubscription: any = [];
  toggle: boolean = true;
  dialoguedata: any;
  inactivedatasource;
  activeSubdatasource
  inactiveSubdatasource
  loadingvalue: boolean = true;
  deletedata: any;
  displayedColumns: string[] = ["event_id", "event_name", "Trainer", "Action", "subscription", "coupon", "info", "users"];
  displayedColumns1: string[] = ["event_id", "event_name", "Trainer", "cover_image", "start_date", "end_date", "price", "Action"];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private eventService: EventService,
    private cdref: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private route: Router,
    private context: ApplicationContext,
    private profileservice: ProfileService,
    private excelservice: ExcelService,
    private exportservice: ExportService
  ) { }

  ngOnInit() {
    this.eventList();
  }

  eventList() {
    this.eventService.eventdata().subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.menus = res["metaData"];
          this.dataSource = new MatTableDataSource<EventDataManage>(this.menus);
          this.buildPagination();
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

  inactiveeventList() {
    this.eventService.inactiveeventdata().subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.inactivemenus = res["metaData"];
          this.inactivedatasource = new MatTableDataSource<EventDataManage>(this.inactivemenus);
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

  eventAdd() {
    const dialogLoginConfig = new MatDialogConfig();
    dialogLoginConfig.autoFocus = true;
    dialogLoginConfig.maxWidth = "100%";
    dialogLoginConfig.minWidth = "30%";
    dialogLoginConfig.minHeight = "50vh";
    const dialogref = this.dialog.open(EventAddComponent, dialogLoginConfig);
    dialogref.afterClosed().subscribe((res) => {
      if (res && res.message) {
        this.snackbar.snackbars("The Event has been added Successfully", "info-snackbar");
        this.eventList();
        this.cdref.markForCheck();
      }
    });
  }

  eventEdit(data) {
    const dialogref = this.dialog.open(EventEditComponent, {
      autoFocus: true,
      maxWidth: "100%",
      minWidth: "30%",
      minHeight: "50vh",
      data: {
        id: data.event_id,
        name: data.event_name,
        description: data.description,
        price: data.price,
        period: data.trial_period,
        startdate: data.start_date,
        enddate: data.end_date,
        starttime: data.start_time,
        endtime: data.end_time,
        type_id: data.event_master_id,
        instructor_id: data.instructor_id,
      },
    });
    this.dialoguedata = {
      id: data.event_id,
      name: data.event_name,
      description: data.description,
      price: data.price,
      period: data.trial_period,
      startdate: data.start_date,
      enddate: data.end_date,
      type_id: data.event_master_id,
      instructor_id: data.instructor_id,
    };
    dialogref.afterClosed().subscribe((res) => {
      if (res.imageupload !== 1) {
        const fd = new FormData();
        fd.append("picture", res.imageupload, res.imageupload.name);
        fd.set("type", "EVENT");
        fd.set("key", res.id);
        fd.set("picture", res.imageupload);
        this.profileservice.EventCoverImageUpload(fd).subscribe((result) => {
          if (result && result.metaData) {
            this.eventList();
            this.cdref.markForCheck();
          }
        });
      }
      if (
        res &&
        res["id"] &&
        res["name"] &&
        res["description"] &&
        res["price"] &&
        res["period"] &&
        res["startdate"] &&
        res["enddate"] &&
        res["type_id"] &&
        (res["name"] !== this.dialoguedata["name"] ||
          res["description"] !== this.dialoguedata["description"] ||
          res["price"] !== this.dialoguedata["price"] ||
          res["period"] !== this.dialoguedata["period"] ||
          res["type_id"] !== this.dialoguedata["type_id"] || res["instructor_id"] !== this.dialoguedata["instructor_id"])
      ) {
        const updatable = {
          event_master_id: res.type_id,
          event_name: res.name,
          description: res.description,
          price: +res.price,
          trial_period: +res.period,
          cover_image: res.image,
          instructor_id: res.instructor_id,
        };
        this.eventService.updateevent(res.id, updatable).subscribe(
          (res) => {
            this.snackbar.snackbars("updated successfully", "info-snackbar");
            setTimeout(() => {
              this.eventList();
            }, 2000);
            this.cdref.markForCheck();
          },
          (err) => {
            this.snackbar.snackbars("Failed to update", "error-snackbar");
          }
        );
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eventinfo(data) {
    this.route.navigate([`event/${data.uuid}`]);
  }

  activateevent(data, value) {
    var updatable: any;
    if (value === 1) {
      updatable = {
        isActive: 0
      }
    } else {
      updatable = {
        isActive: 1
      }
    }
    this.eventService.updateevent(data.event_id, updatable).subscribe((res) => {
      if (res.statusCode == 200 && res.message && res.metaData) {
        if (value == 1) {
          this.snackbar.snackbars("DeActivated successfully", "error-snackbar");
          this.eventList();
        } else {
          this.snackbar.snackbars("Activated successfully", "info-snackbar");
          this.inactiveeventList();
        }
        this.cdref.markForCheck();
      }
    });
  }

  deleteevent(data) {
    const dialogDel = this.dialog.open(EventDelete, {
      width: "250px",
      data: { delid: data.event_id },
    });
    this.deletedata = { id: data.event_id };

    dialogDel.afterClosed().subscribe((result) => {
      if (result && result.id && result.id == this.deletedata.id) {
        this.eventService.deleteevent(result.id).subscribe(
          (res) => {
            setTimeout(() => {
              this.eventList();
            }, 2000);
            this.snackbar.snackbars("Deleted Successfully", "info-snackbar");
            this.cdref.markForCheck();
          },
          (err) => {
            this.snackbar.snackbars("The Event cannot be Deleted", "error-snackbar");
          }
        );
      } else {
        this.snackbar.snackbars("No changes done", "info-snackbar");
      }
    });
  }

  movetosubscription(data) {
    if (data) {
      this.context.setData(ContextDataItem.EVENT_ID, data.event_id);
      this.context.setData(ContextDataItem.EventUUID, data.uuid);
      this.context.setData(ContextDataItem.EVENT_NAME, data.event_name);
      this.route.navigate([`admin/subscription-manage`]);
    } else {
      return false;
    }
  }

  movetocoupon(data) {
    if (data) {
      this.context.setData(ContextDataItem.EVENT_ID, data.event_id);
      this.context.setData(ContextDataItem.EventUUID, data.uuid);
      this.context.setData(ContextDataItem.EVENT_NAME, data.event_name);
      this.route.navigate([`admin/coupan-manage`]);
    } else {
      return false;
    }
  }

  private buildPagination(pageIndex = 0, pageLength = 5) {
    let dataFrom = pageIndex * pageLength;
    let dataTo = pageLength * (pageIndex + 1);

    if (dataFrom > this.menus.length) {
      dataFrom = 0;
    }
    if (dataTo > this.menus.length) {
      dataTo = this.menus.length;
    }
    this.dataSource = new MatTableDataSource(
      this.menus.slice(dataFrom, dataTo)
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.cdref.markForCheck();
  }

  managePagination(paginationEvent) {
    this.buildPagination(paginationEvent.pageIndex, paginationEvent.pageSize);
    this.cdref.markForCheck();
  }

  userstoggle(data) {
    if (data === 1) {
      this.eventList();
    } else {
      this.inactiveeventList();
    }
    this.toggle = !this.toggle;
    this.cdref.markForCheck();
  }

  trainerinfo(data) {
    this.dialog.open(TrainerInfo, {
      width: "500px",
      data: {
        name: data.Instructor.diaplay_name,
        email: data.Instructor.email_id,
        gender: data.Instructor.gender,
        mobile: data.Instructor.mobile_number,
        dob: data.Instructor.dob,
        registered: data.Instructor.created_at,
      },
    });
  }
  additionalinfo(data) {
    this.dialog.open(ExtraInfo, {
      width: "550px",
      height: "500px",
      data: {
        id: data.event_id,
        trainer: data.instructor_id,
        image: data.cover_image,
        start_date: data.start_date,
        end_date: data.end_date,
        start_time: data.start_time,
        end_time: data.end_time,
        description: data.description,
        period: data.trial_period,
        created: data.created_at,
        masterid: data.event_master_id,
        price: data.price
      }
    })
  }
  tousers(data) {
    this.context.setData(ContextDataItem.EVENT_ID, data.event_id);
    this.context.setData(ContextDataItem.EventUUID, data.uuid);
    this.context.setData(ContextDataItem.TRAINER_ID, data.Instructor.uuid);
    this.context.setData(ContextDataItem.EVENT_NAME, data.event_name);
    this.route.navigate([`admin/user`]);
  }

  movetobatch(data) {
    if (data) {
      this.context.setData(ContextDataItem.EVENT_ID, data.event_id);
      this.context.setData(ContextDataItem.EVENT_NAME, data.event_name);
      this.route.navigate([`admin/batch-manage`]);
    } else {
      return false;
    }
  }
  //export feature
  ExportTOExcel(data) {
    if (data === 1) {
      this.exportservice.allactiveevents().subscribe(res => {
        this.excelservice.exportAsExcelFile(res && res.metaData ? res['metaData'] : this.menus, 'Active Events');
      })
    } else if (data === 2) {
      this.exportservice.allexpiredevents().subscribe(res => {
        this.excelservice.exportAsExcelFile(res && res.metaData ? res['metaData'] : this.inactivemenus, 'InActive Events');
      })
    } else {
      return null;
    }
  }
}