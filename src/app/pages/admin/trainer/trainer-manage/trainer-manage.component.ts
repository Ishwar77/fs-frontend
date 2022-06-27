import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatSort, MatPaginator } from '@angular/material';
import * as XLSX from 'xlsx';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { UserService } from 'src/app/services/users';
import { UserDataManage } from '../../user/user-manage/user-manage.component';
import { ExcelService } from 'src/app/services/excel';

@Component({
  selector: 'app-trainer-manage',
  templateUrl: './trainer-manage.component.html',
  styleUrls: ['./trainer-manage.component.scss']
})
export class TrainerManageComponent implements OnInit {
  private sampleFilePath = 'assets/onboarding/FS-Client-Onboarding-v2.xlsx';
  pageManager: PageManager = new PageManager();
  fileName = 'trainerRecord.xlsx';
  menus: any = [];
  items: any = [];
  loadingvalue: boolean = true;
  inactivedatasource;
  displayedColumns: string[] = [
    "user_id",
    "diaplay_name",
    "email_id",
    "mobile_number",
    "gender",
    // "dob",
    "created_at",
    "Action",
  ];
  dataSource; //= new MatTableDataSource<UserDataManage>(this.menus);
  toggle: boolean = true;
  uuid: any;

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private cdref: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private excelservice: ExcelService
  ) { }

  ngOnInit() {
    this.userrole();
  }

  userrole() {
    this.userService.userroleList().subscribe(res => {
      var uuid = res['metaData'].filter(x => x.user_role_id === 6);
      this.uuid = uuid[0].uuid;
      this.userList();
    })
  }

  userList() {
    this.userService.userList(this.uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.menus = res["metaData"];
          this.menus = this.menus.filter(x => x.user_role_id = 6)
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

  inactiveuserlist() {
    this.userService.inactiveuserlist(this.uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.items = res["metaData"];
          this.inactivedatasource = new MatTableDataSource<UserDataManage>(this.items);
          // this.buildPagination();

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

  userstatus(data, status) {
    var update: any;
    if (status === 0) {
      update = {
        isActive: 1,
      };
    } else {
      update = {
        isActive: 0,
      };
    }
    this.userService.blockusers(data.user_id, update).subscribe((res) => {
      if (res) {
        if (status == 0) {
          this.snackbar.open("Activated Successfully", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["sucess-snackbar"],
          });
          this.inactiveuserlist();
        } else {
          this.snackbar.open("User Blocked", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["error-snackbar"],
          });
          this.userList();
        }
      }
      this.cdref.markForCheck();
    });
  }

  userstoggle(data) {
    if (data === 1) {
      this.userList();
    } else {
      this.inactiveuserlist();
    }
    this.toggle = !this.toggle;
    this.cdref.markForCheck();
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

    this.dataSource.paginator = this.paginator;
    this.cdref.markForCheck();
  }

  managePagination(paginationEvent) {
    this.buildPagination(paginationEvent.pageIndex, paginationEvent.pageSize);
    this.cdref.markForCheck();
  }

  public exportexcel(data) {
    if (data && (this.menus || this.items)) {
      this.excelservice.exportAsExcelFile(data === 1 ? this.menus : this.items, data === 1 ? 'Active Trainers' : 'Inactive Trainers');
      this.cdref.markForCheck();
    }
  }
}
