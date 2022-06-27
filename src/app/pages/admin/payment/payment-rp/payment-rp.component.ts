import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import { PaymentService } from "src/app/services/payment";
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { FormGroup, FormControl } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel';
import { ExportService } from 'src/app/services/export';

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
  selector: "app-payment-rp",
  templateUrl: "./payment-rp.component.html",
  styleUrls: ["./payment-rp.component.scss"],
})
export class PaymentRpComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  dateFrom: any;
  dateTo: any;
  menus: any = [];
  userrole: any;
  users: any = [];
  loadingvalue: boolean = true;
  displayedColumns: string[] = ["slno", "method", "user_id", "amount", "notes"];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private paymentService: PaymentService,
    private cdref: ChangeDetectorRef,
    private excelservice: ExcelService,
    private exportservice: ExportService
  ) { }

  ngOnInit() {
    this.paymentList();
  }
  //filter by from and to date
  getPaymentByDate() {
    if (this.dateTo && this.dateFrom) {
      var updatable = {
        from: this.dateFrom,
        to: this.dateTo
      }
      this.paymentList(updatable ? updatable : '');
    } else {
      return;
    }
  }
  //to get the list of payments from razor pay orders
  paymentList(obj = null) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todays = yyyy + '-' + mm + '-' + dd;
    var updatable = {
      from: "2020-01-01",
      to: todays,
    };
    // this.paymentService.paymentAllRP(obj ? obj : updatable).subscribe(
    this.paymentService.paymentAll().subscribe(
      (res) => {
        if (res && res["metaData"].length) {
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
  //export to excel
  ExportTOExcel() {
    this.exportservice.allpayments().subscribe(res => {
      this.excelservice.exportAsExcelFile(res && res.metaData ? res.metaData : this.menus, "Payments");
      this.cdref.markForCheck();
    })
  }
}
