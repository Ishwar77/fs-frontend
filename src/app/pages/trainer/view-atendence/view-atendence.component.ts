import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AttendenceService } from 'src/app/services/attendence';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from 'src/app/services/batch';
import { ExcelService } from 'src/app/services/excel';
import { ExportService } from 'src/app/services/export';

export interface AttendenceDataManage {
  slno: any;
  username: any;
  count: any;
}

@Component({
  selector: 'app-view-atendence',
  templateUrl: './view-atendence.component.html',
  styleUrls: ['./view-atendence.component.scss']
})
export class ViewAtendenceComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  displayedColumns: string[];
  dataSource;
  UUID: any;
  userList: any = [];
  date: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pipe: DatePipe;
  searchUsers;
  @Input() public menus: any;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  constructor(
    private cdref: ChangeDetectorRef,
    private attendenceService: AttendenceService,
    private activatedroute: ActivatedRoute,
    private batchservice: BatchService,
    private excelservice: ExcelService,
    private exportservice: ExportService
  ) {
  }

  ngOnInit() {
    this.listentourl();
    this.getAllUserList();
    this.dataSource = new MatTableDataSource<AttendenceDataManage>(this.menus);
  }
  //listen to url
  listentourl() {
    this.activatedroute.params.subscribe(res => {
      this.UUID = res.uuid;
      this.cdref.markForCheck();
    })
  }

  //To get all the details
  getAllUserList() {
    this.attendenceService.getInfo(this.UUID).subscribe((res) => {
      if (res["metaData"] && res['metaData'].length) {
        this.displayedColumns = ['slno', 'username'];
        for (var i = 0; i <= res.metaData.length - 1; i++) {
          var arrays: any[] = res['metaData'][i].Registration.User;
          this.userList.push(arrays);
        }
        if (this.userList) {
          this.dataSource = new MatTableDataSource<AttendenceDataManage>(this.userList);
        }
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.SUCCESS;
      } else {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
      }
    },
      (err) => {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
        this.cdref.markForCheck();
      });
  }

  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }

  gettheusersbasedondate() {
    if (this.date) {
      this.batchservice.getattendancelist(this.UUID, this.date).subscribe(res => {
        if (res["metaData"] && res['metaData'].length) {
          this.displayedColumns = ['slno', 'username', 'date'];
          this.dataSource = new MatTableDataSource<AttendenceDataManage>(res.metaData);
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.SUCCESS;
        } else {
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.FAILED;
        }
      },
        (err) => {
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.FAILED;
          this.cdref.markForCheck();
        });
    }
  }
  //filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //export excel
  ExportTOExcel() {
    if (this.date) {
      this.exportservice.attendanceonbatchuuidanddate(this.UUID, this.date).subscribe(res => {
        var name = "Attendance of " + this.date
        this.excelservice.exportAsExcelFile(res && res.metaData ? res.metaData : this.userList, name);
        this.cdref.markForCheck();
      })
    } else {
      this.exportservice.allattendance().subscribe(res => {
        this.excelservice.exportAsExcelFile(res && res.metaData ? res.metaData : this.userList, "Attendance");
        this.cdref.markForCheck();
      });
    }
  }
}