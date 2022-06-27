import {
  Component,
  OnInit,
  ChangeDetectorRef} from "@angular/core";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import { TrainerService } from 'src/app/services/trainer';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-user-manage",
  templateUrl: "./user-manage.component.html",
  styleUrls: ["./user-manage.component.scss"],
})

export class UserManageComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];

  constructor(
    private cdref: ChangeDetectorRef,
    private trainerservice: TrainerService,
    private context: ApplicationContext,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listentoURL();
  }

  listentoURL() {
    this.activatedroute.params.subscribe(res => {
      const eventuuid = res.eventId;
      const useruuId = this.context.getData(ContextDataItem.UUID);
      this.userList(eventuuid,useruuId);
      this.cdref.markForCheck();
    })
  }

  userList(eventuuid,useruuId) {
    this.trainerservice.usersfortrainers(eventuuid, useruuId).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.menus = res["metaData"];
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
}