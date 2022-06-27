import { Component, EventEmitter, OnInit, ViewChild, ChangeDetectorRef, Input, Output } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { EventlistReedeemComponent } from '../eventlist-reedeem/eventlist-reedeem.component';
import { CoupanRedemComponent } from '../../dialog/coupan-redem/coupan-redem.component';
import { RedemptionService } from 'src/app/services/redemption';
import { SnackbarService } from 'src/app/services/snackbar';
import { RewardService } from 'src/app/services/rewards';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';

export interface RewarddataManage {
  menus: any;
}
@Component({
  selector: 'app-rewards-history',
  templateUrl: './reedeem-history.component.html',
  styleUrls: ['./reedeem-history.component.scss']
})

export class ReedeemHistoryComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  displayedColumns: string[] = ['id', 'name', 'eventname', 'points', 'status', 'action'];
  dataSource;
  UUID: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() public back: EventEmitter<any> = new EventEmitter<any>();
  // @Input() public menus: any;
  public menus: any = [];

  constructor(
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private reddemservice: RedemptionService,
    private snackbar: SnackbarService,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    const trainerId = this.context.getData(ContextDataItem.USER_ID);
    this.gettrainerreedemdetails(trainerId ? trainerId : '');
  }
  //get reedem by trainerid
  gettrainerreedemdetails(trainerid) {
    this.reddemservice.getbytrainerid(trainerid).subscribe(res => {
      if (res && res.metaData && res.metaData.length) {
        this.menus = res['metaData'];
        this.dataSource = new MatTableDataSource(this.menus);
        this.cdref.markForCheck();
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.SUCCESS;
      } else {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
      }
    }, (err) => {
      this.pageManager.status = PageStatus.READY;
      this.pageManager.action = PageAction.FAILED;
    });
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
  //accept the reedem and create the private coupon
  acceptRedeem(obj) {
    const dialogref = this.dialog.open(CoupanRedemComponent, {
      width: '300px', data: {
        menus: obj
      }
    });
    dialogref.afterClosed().subscribe(res => {
      if (res && res.data) {
        const trainerId = this.context.getData(ContextDataItem.USER_ID);
        this.gettrainerreedemdetails(trainerId ? trainerId : '');
        this.back.next();
      }
    });
  }
  //reject the reedem
  rejectreedem(obj) {
    this.reddemservice.rejectbyuserid(obj ? obj.user_id : '').subscribe(res => {
      if (res && res.metaData) {
        this.snackbar.snackbars("Rejected successfully", "info-snackbar");
        this.cdref.markForCheck();
        const trainerId = this.context.getData(ContextDataItem.USER_ID);
        this.gettrainerreedemdetails(trainerId ? trainerId : '');
        this.back.next();
      }
    });
  }
}
