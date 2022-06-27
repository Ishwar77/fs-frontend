import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { RewardService } from 'src/app/services/rewards';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';


export interface RewardDataManage {
  id: any;
  title: any;
  credit: any;
  debit: any;
}
@Component({
  selector: 'app-rewards-page',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})

export class RewardsComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  displayedColumns: string[] = ['id', 'title', 'credit', 'debit', 'balance'];
  dataSource;
  UUID:any;
  menus: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private cdref: ChangeDetectorRef,
    private rewardservice: RewardService,
    private context: ApplicationContext,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    const userId = this.context.getData(ContextDataItem.USER_ID);
    this.UUID = this.context.getData(ContextDataItem.UUID);
    this.getallrewards(this.UUID);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getallrewards(uuId) {
    if (!uuId) {
      return false;
    }
    this.rewardservice.getrewardsservice(uuId).subscribe((res) => {
      if (res["metaData"] && res["metaData"].length) {
        this.menus = res["metaData"];
        this.dataSource = new MatTableDataSource<RewardDataManage>(this.menus);
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
  copyInputMessage() {
    if(this.UUID) {
      window.navigator.clipboard.writeText(this.UUID);
      this.snackbar.open("Successfully Copied the Referal ID to Clipboard", "", {
        duration: 3000,
        verticalPosition: "top",
        panelClass: ["sucess-snackbar"],
      });
    }
  }
}