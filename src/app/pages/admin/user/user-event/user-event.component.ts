import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { MatSort } from "@angular/material";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import { TrainerService } from 'src/app/services/trainer';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { Router } from '@angular/router';

export interface UserDataManage {
  user_id?: string;
  user_role_id?: string;
  address_id?: string;
  diaplay_name?: string;
  mobile_number?: string;
  email_id?: string;
  profile_picture_url?: string;
  referral_code?: string;
  gender?: string;
  dob?: string;
  created_at?: string;
  updated_at?: string;
  isActive?: string;
}

@Component({
  selector: "app-user-event",
  templateUrl: "./user-event.component.html",
  styleUrls: ["./user-event.component.scss"],
})
export class UserEventComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];
  items: any = [];
  loadingvalue: boolean = true;
  inactivedatasource;
  eventname: any;
  displayedColumns: string[] = [
    "user_id",
    "diaplay_name",
    "email_id",
    "mobile_number",
    "gender",
    "status"
  ];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private cdref: ChangeDetectorRef,
    private trainerservice: TrainerService,
    private context: ApplicationContext,
    private route: Router,
  ) { }

  ngOnInit() {
    this.eventname = this.context.getData(ContextDataItem.EVENT_NAME);
    const eventuuId = this.context.getData(ContextDataItem.EventUUID);
    const traineruuId = this.context.getData(ContextDataItem.TRAINER_ID);
    if (eventuuId && traineruuId) {
      this.userList(eventuuId, traineruuId);
    } else {
      this.route.navigate(["admin/event-manage"]);
    }
    this.cdref.markForCheck();
  }

  userList(eventid, trainerid) {
    this.trainerservice.usersfortrainers(eventid, trainerid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.menus = res["metaData"];
          this.dataSource = new MatTableDataSource<UserDataManage>(this.menus);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mailto(data) {
    const mailText = `mailto:${data.email_id}?subject=`;
    window.location.href = mailText;
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
}