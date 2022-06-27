import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PageManager } from 'src/app/models/page';
import { MatPaginator, MatTableDataSource } from '@angular/material';

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
  selector: 'app-user-switch',
  templateUrl: './user-switch.component.html',
  styleUrls: ['./user-switch.component.scss']
})
export class UserSwitchComponent implements OnInit {

  pageManager: PageManager = new PageManager();
  dateFrom: any;
  dateTo: any;
  menus: any = [];
  userrole: any;
  users: any = [];
  loadingvalue: boolean = true;
  displayedColumns: string[] = ["slno", "created_at", "method", "user_id", "amount", "notes"];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private cdref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
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

}
