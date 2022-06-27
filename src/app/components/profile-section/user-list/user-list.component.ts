import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/users';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel';
import { ExportService } from 'src/app/services/export';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  public menus: any = [];
  public uuid: any;
  public name: any;
  constructor(
    private cdref: ChangeDetectorRef,
    private userservice: UserService,
    private context: ApplicationContext,
    private route: Router,
    private excelservice: ExcelService
  ) { }

  ngOnInit() {
    if (this.context.getData(ContextDataItem.USER_ROLE) !== 6) {
      this.route.navigate(['home']);
      return false;
    }
    this.uuid = this.context.getData(ContextDataItem.UUID);
    this.usersactivelist(this.uuid);
  }
  //get active users
  usersactivelist(uuid) {
    if (uuid) {
      this.name = 'Active Users'
      this.userservice.userlistfortrainer(uuid).subscribe(res => {
        if (res && res['metaData'].length) {
          this.menus = res['metaData'];
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
        })
    }
  }
  //get inactive users
  inactiveusersactivelist(uuid) {
    this.name = 'Inactive Users'
    if (uuid) {
      this.userservice.inactiveuserlist(uuid).subscribe(res => {
        if (res && res['metaData']) {
          this.menus = res['metaData'];
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
        })
    }
  }
  //get based on filter
  getusers(value) {
    if (value === 1) {
      this.usersactivelist(this.uuid);
    } else if (value === 2) {
      this.inactiveusersactivelist(this.uuid);
    } else {
      return null;
    }
    this.cdref.markForCheck();
  }
  //export feature
  ExportTOExcel() {
    if (this.menus && this.menus.length) {
      this.excelservice.exportAsExcelFile(this.menus, 'Users List');
      this.cdref.markForCheck();
    }
  }
}