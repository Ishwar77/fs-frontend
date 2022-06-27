import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import { PaymentService } from "src/app/services/payment";
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/services/session';
import { SnackbarService } from 'src/app/services/snackbar';

export interface PaymentRPManage {
  slno?: string;
  user_id?: string;
  created_at?: string;
  order_id?: string;
  payment_id?: string;
  method?: string;
  notes?: any;
  payment_status?: string;
}

@Component({
  selector: "app-session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.scss"],
})
export class SessionComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];
  users: any = [];
  public displayedColumns: string[] = ["slno", "name", "ip", "created", "action"];
  public dataSource: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private cdref: ChangeDetectorRef,
    private sessionservice: SessionService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    this.getallsession();
  }
  //get all session details
  getallsession() {
    this.sessionservice.getallsession().subscribe(res => {
      if (res && res["metaData"] && res['metaData'].length) {
        this.menus = res["metaData"];
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
  //filter by name
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //for pagination
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
    this.dataSource.paginator = this.paginator;
    this.cdref.markForCheck();
  }
  //for pagination
  managePagination(paginationEvent) {
    this.buildPagination(paginationEvent.pageIndex, paginationEvent.pageSize);
    this.cdref.markForCheck();
  }
  //delete the session
  deletesession(obj) {
    this.sessionservice.deletesession(obj ? obj.user_id : '').subscribe(res => {
      this.getallsession();
      this.snackbar.snackbars("Session Deleted successfully", "info-snackbar");
      this.cdref.markForCheck();
    }, err => {
      this.snackbar.snackbars("Cannot delete the session", "error-snackbar");
      this.cdref.markForCheck();
    })
  }
}
