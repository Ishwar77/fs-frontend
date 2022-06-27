import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatSnackBar,
} from "@angular/material";
import { PaymentService } from "src/app/services/payment";
import { ProfileService } from "src/app/services/profile";
import { UserInfo } from "../../user/user-info/user-info";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import { Router } from '@angular/router';

export interface PaymentDataManage {
  slno?: string;
  user_id?: string;
  created_at?: string;
  order_id?: string;
  payment_id?: string;
  // signature?: string;
  payment_status?: string;
}
export interface dialogdata {
  name: any;
  email: any;
  mobile: any;
  dob: any;
  gender: any;
  registered: any;
}

@Component({
  selector: "app-paymentmanage",
  templateUrl: "./paymentmanage.component.html",
  styleUrls: ["./paymentmanage.component.scss"],
})
export class PaymentmanageComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];
  users: any = [];
  loadingvalue: boolean = true;
  displayedColumns: string[] = [
    "slno",
    "event",
    "user_id",
    "created_at",
    "order_id",
    "payment_id",
    "amount"
    /* "signature", */
   // "payment_status",
   // "Action",
  ];
  dataSource; // = new MatTableDataSource<PaymentDataManage>(this.menus);

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private paymentService: PaymentService,
    private cdref: ChangeDetectorRef,
    private userservice: ProfileService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit() {
    this.paymentList();
  }
  eventAdd() { }
  paymentList() {
    this.paymentService.paymentAll().subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  userinfo(data) {
    this.userservice.getprofiledetails(data.user_id).subscribe((res) => {
      this.users = res["metaData"];
      this.dialog.open(UserInfo, {
        width: "500px",
        data: {
          name: this.users.diaplay_name,
          email: this.users.email_id,
          gender: this.users.gender,
          mobile: this.users.mobile_number,
          dob: this.users.dob,
          registered: this.users.created_at,
        },
      });
    });
  }

  capturepayment(data) {
    const updatable = {
      paymentId: data.payment_id,
      //  amount: +data.Subscription.amount
      amount: +data.totalamount * 100,
    };
    this.paymentService.capturepayment(updatable).subscribe(
      (res) => {
        setTimeout(() => {
          this.paymentList();
          this.snackbar.open("Captured Successfully", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["sucess-snackbar"],
          });
          this.cdref.markForCheck();
        }, 1000);
      },
      (err) => {
        this.snackbar.open("Error", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
      }
    );
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

  eventmove(data) {
    this.route.navigate([`event/${data.uuid}`]);
    this.cdref.markForCheck();
  }
}
