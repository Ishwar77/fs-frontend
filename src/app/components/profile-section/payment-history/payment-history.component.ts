import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { PaymentService } from 'src/app/services/payment';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { ExcelService } from 'src/app/services/excel';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  @Input() public paymentdata: any;
  userrole: any;
  pageManager: PageManager = new PageManager();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[];
  public dataSource: any = [];
  constructor(
    private paymentservice: PaymentService,
    private cdref: ChangeDetectorRef,
    private context: ApplicationContext,
    private excelservice: ExcelService
  ) { }

  ngOnInit() {
    const useruuid = this.context.getData(ContextDataItem.UUID);
    this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
    if (this.userrole == 3 && useruuid) {
      this.paymenthistorydetails(useruuid);
      this.displayedColumns = ['si', 'date', 'event', 'amount'];
    } else if (this.userrole == 6 && useruuid) {
      this.paymenthistorydetailsfortrainer(useruuid);
      this.displayedColumns = ['si', 'date', 'orderid', 'name', 'event', 'amount'];
    } else {
      return null;
    }
  }

  paymenthistorydetails(uuid) {
    this.paymentservice.getpaymentforuser(uuid).subscribe(res => {
      if (res["metaData"] && res.metaData.length) {
        this.dataSource = res["metaData"];
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.SUCCESS;
      } else {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
      }
      this.cdref.markForCheck();
    }, (err) => {
      this.pageManager.status = PageStatus.READY;
      this.pageManager.action = PageAction.FAILED;
      this.cdref.markForCheck();
    })
  }

  paymenthistorydetailsfortrainer(uuid) {
    this.paymentservice.getpaymentfortrainer(uuid).subscribe(res => {
      if (res["metaData"] && res.metaData.length) {
        this.dataSource = res["metaData"];
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.SUCCESS;
      } else {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
      }
      this.cdref.markForCheck();
    }, (err) => {
      this.pageManager.status = PageStatus.READY;
      this.pageManager.action = PageAction.FAILED;
      this.cdref.markForCheck();
    })
  }

  private buildPagination(pageIndex = 0, pageLength = 5) {
    let dataFrom = pageIndex * pageLength;
    let dataTo = pageLength * (pageIndex + 1);

    if (dataFrom > this.dataSource.length) {
      dataFrom = 0;
    }
    if (dataTo > this.dataSource.length) {
      dataTo = this.dataSource.length;
    }
    this.dataSource = new MatTableDataSource(
      this.dataSource.slice(dataFrom, dataTo)
    );
    this.dataSource.paginator = this.paginator;
    this.cdref.markForCheck();
  }

  managePagination(paginationEvent) {
    this.buildPagination(paginationEvent.pageIndex, paginationEvent.pageSize);
    this.cdref.markForCheck();
  }
  //export feature
  ExportTOExcel() {
    if (this.dataSource && this.dataSource.length) {
      this.excelservice.exportAsExcelFile(this.dataSource, 'My payments');
      this.cdref.markForCheck();
    }
  }
}
