import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { EventlistReedeemComponent } from '../eventlist-reedeem/eventlist-reedeem.component';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { RedemptionService } from 'src/app/services/redemption';
import { RewardService } from 'src/app/services/rewards';

export interface RewardsDataManage {
  menus: any;
}
@Component({
  selector: 'app-rewards-page',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})

export class RewardsprofileComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  displayedColumns: string[] = ['id', 'title', 'credit', 'debit', 'balance'];
  dataSource;
  UUID: any;
  public userrole: any;
  public showreedem: boolean = true;
  public showview: boolean = false;
  public menus: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @Input() public menus: any;

  constructor(
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private context: ApplicationContext,
    private redemptionservice: RedemptionService,
    private rewardservice: RewardService,
  ) { }

  ngOnInit() {
    this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
    const userid = this.context.getData(ContextDataItem.USER_ID);
    const uuid = this.context.getData(ContextDataItem.UUID);
    this.getallrewards(uuid);
    this.buildPagination();
    this.getreedem(userid ? userid : '');
  }
  //To get the rewards service
  getallrewards(uuId) {
    if (!uuId) {
      return false;
    }
    this.rewardservice.getrewardsservice(uuId).subscribe((res) => {
      if (res["metaData"] && res["metaData"].length) {
        this.menus = res["metaData"];
        this.dataSource = new MatTableDataSource(this.menus);
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
      }
    );
    this.cdref.markForCheck();
  }
  //to build the pagination
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
  //manage the pagination
  managePagination(paginationEvent) {
    this.buildPagination(paginationEvent.pageIndex, paginationEvent.pageSize);
    this.cdref.markForCheck();
  }
  //open the redeem dialog
  reedeemReward() {
    const dialogref = this.dialog.open(EventlistReedeemComponent, {
      width: '300px',
      data: {
        menus: this.menus && this.menus.length ? this.menus[0] : ''
      }
    });
    dialogref.afterClosed().subscribe(res => {
      if (res && res.data && res.data == true) {
        const userid = this.context.getData(ContextDataItem.USER_ID);
        this.getreedem(userid);
      }
    });
  }
  //get reedem by userid
  getreedem(userid) {
    this.redemptionservice.getbyuserid(userid ? userid : '').subscribe(res => {
      if (res && res['metaData'].length) {
        for (var i = 0; i < res.metaData.length; i++) {
          if (res.metaData[i].isActive === 1) {
            this.showreedem = false;
            this.cdref.markForCheck();
          }
        }
      }
    });
  }
}
