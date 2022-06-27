import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild
} from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSnackBar,
} from "@angular/material";
import { MatSort } from "@angular/material";
import { UserService } from "src/app/services/users";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/services/excel';
import { ExportService } from 'src/app/services/export';

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
  selector: "app-user-manage",
  templateUrl: "./user-manage.component.html",
  styleUrls: ["./user-manage.component.scss"],
})
export class UserManageComponent implements OnInit {
  private sampleFilePath = 'assets/onboarding/FS-Client-Onboarding-v2.xlsx';
  pageManager: PageManager = new PageManager();
  menus: any = [];
  fileName = 'userManage.xlsx';
  items: any = [];
  loadingvalue: boolean = true;
  inactivedatasource;
  uuid: any;
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

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private cdref: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private excelservice: ExcelService,
    private exportservice: ExportService
  ) { }

  ngOnInit() {
    this.userrole();
  }

  userrole() {
    this.userService.userroleList().subscribe(res => {
      var uuid = res['metaData'].filter(x => x.user_role_id === 3);
      this.uuid = uuid[0].uuid;
      this.userList();
    })
  }

  userList() {
    this.userService.userList(this.uuid).subscribe(
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

  inactiveuserlist() {
    this.userService.inactiveuserlist(this.uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.items = res["metaData"];
          this.inactivedatasource = new MatTableDataSource<UserDataManage>(
            this.items
          );
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
    if (status === 0) {
      const update = {
        isActive: 1,
      };
      this.userService.blockusers(data.user_id, update).subscribe((res) => {
        this.snackbar.open("Activated Successfully", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["sucess-snackbar"],
        });
        this.inactiveuserlist();
        this.cdref.markForCheck();
      });
    } else {
      const update = {
        isActive: 0,
      };
      this.userService.blockusers(data.user_id, update).subscribe((res) => {
        this.snackbar.open("User Blocked", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });

        this.userList();
        this.cdref.markForCheck();
      });
    }
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
    // this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.cdref.markForCheck();
  }

  managePagination(paginationEvent) {
    this.buildPagination(paginationEvent.pageIndex, paginationEvent.pageSize);
    this.cdref.markForCheck();
  }

  public exportexcel(data) {
    if (data === 1) {
      this.exportservice.allactiveuserdetails().subscribe(res => {
        this.excelservice.exportAsExcelFile(res && res.metaData ? res.metaData : this.menus, 'Active Users');
      });
    } else if (data === 2) {
      this.exportservice.allinactiveuserdetails().subscribe(res => {
        this.excelservice.exportAsExcelFile(res && res.metaData ? res.metaData : this.items, 'InActive Users');
      });
    } else {
      return null;
    }
    this.cdref.markForCheck();
  }
}
