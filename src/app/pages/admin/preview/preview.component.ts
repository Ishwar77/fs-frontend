import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"],
})
export class PreviewComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];
  constructor(
    private cdref: ChangeDetectorRef,
    private route: Router,
    private userservice: UserService
  ) { }
  ngOnInit() {
    this.getcounts();
  }

  getcounts() {
    this.userservice.allcounts().subscribe((res) => {
      if (res) {
        this.menus = res['metaData'][0];
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.SUCCESS;
      } else {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
        this.cdref.markForCheck();
      }
    }, (err) => {
      this.pageManager.status = PageStatus.READY;
      this.pageManager.action = PageAction.FAILED;
      this.cdref.markForCheck();
    });
  }
  routetoanother(data) {
    if (data == 1) {
      this.route.navigate([`admin/user-manage`]);
    } else if (data == 2) {
      this.route.navigate([`admin/event-manage`]);
    } else if (data == 3) {
      this.route.navigate([`admin/trainer-manage`]);
    } else {
      this.route.navigate([`admin/enquiry`]);
    }
    this.cdref.markForCheck();
  }
}