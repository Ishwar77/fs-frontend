import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { SwitchbatchService } from 'src/app/services/switchbatch';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { SnackbarService } from 'src/app/services/snackbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-batches',
  templateUrl: './trainer-batch.component.html',
  styleUrls: ['./trainer-batch.component.scss']
})
export class TrainerBatchComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  public menus: any = [];
  public uuid: any;
  constructor(
    private cdref: ChangeDetectorRef,
    private switchservice: SwitchbatchService,
    private context: ApplicationContext,
    private snackbar: SnackbarService,
    private route: Router
  ) { }

  ngOnInit() {
    if (this.context.getData(ContextDataItem.USER_ROLE) !== 6) {
      this.route.navigate(['home']);
      return false;
    }
    this.uuid = this.context.getData(ContextDataItem.UUID);
    this.usersactivelist(this.uuid);
  }
  usersactivelist(uuid) {
    if (uuid) {
      this.switchservice.getallbasedontraineruuid(uuid).subscribe(res => {
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
  //accept the batch
  acceptance(data) {
    const update = {
      "batch_id": data.batch_id
    }
    this.switchservice.acceptbatch(data.reg_batch_id, update).subscribe(res => {
      if (res && res['metaData']) {
        setTimeout(() => {
          this.usersactivelist(this.uuid);
        }, 2000);
        this.snackbar.snackbars("Batch Switch Accepted successfully", "info-snackbar");
      }
    })
  }
  //reject the batch
  reject(data) {
    this.switchservice.rejectbatch(data.user_id, data.batch_id, data.reg_batch_id).subscribe(res => {
      if (res && res['metaData']) {
        setTimeout(() => {
          this.usersactivelist(this.uuid);
        }, 2000);
        this.snackbar.snackbars("Batch Switch Rejected successfully", "error-snackbar");
      }
    })
  }
}
