import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit, Inject } from "@angular/core";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import { MatDialog, MatSnackBar, MatPaginator, MatSort } from "@angular/material";
import { AdvertiseMasterComponent } from "../advertise-master/advertise-master.component";
import { AdvertiseService } from "src/app/services/advertsise";
import { AdvertiseDeleteComponent } from '../advertise-delete/advertise-delete.component';
import { SnackbarService } from 'src/app/services/snackbar';

export interface AdvertiseDataManage {
  advertiseid: any;
  createdate: any;
  pagename: any;
  days: any;
  amount: any;
}

export interface editAdvertiseData {
  obj: any;
  editable: boolean;
}

@Component({
  selector: "app-advertise-main",
  templateUrl: "./advertise-main.component.html",
  styleUrls: ["./advertise-main.component.scss"],
})
export class AdvertiseMainComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];

  subs: any = [];
  dialoguedata: any;
  advertiseMasterID: any;
  uuid: any;
  eventname: any;
  loadingvalue: boolean = true;
  deletedata: any;
  displayedColumns: string[] = ["advertiseid", "createdate", "pagename", "days", "amount", "action"];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private cdref: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private advertiseService: AdvertiseService,
  ) { }

  ngOnInit() {
    this.getAllAdvertiseMaster();
  }

  getAllAdvertiseMaster() {
    this.advertiseService.advertiseMasterAll().subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"]) {
          this.dataSource = res["metaData"];
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
  //to open the edit dialog and update the advertise
  advertiseMasterEdit(data) {
    const dialogref = this.dialog.open(AdvertiseMasterComponent, {
      data: {
        editable: true,
        obj: data,
      },
    });
    dialogref.afterClosed().subscribe((res) => {
      if (res && res.name && res.days && res.amount && res.id) {
        const update = {
          spot_name: res && res.name ? res.name : '',
          spot_days: res && res.days ? res.days : '',
          spot_amount: res && res.amount ? res.amount : '',
        }
        this.advertiseService.updateAdvertiseMaster(res && res.id ? res.id : '', update ? update : '').subscribe(res => {
          this.getAllAdvertiseMaster();
          this.snackbar.snackbars("Advertise section updated successfully", "info-snackbar");
          this.cdref.markForCheck();
        }, err => {
          this.snackbar.snackbars("Unable to update the infomation", "error-snackbar");
        })
      }
    });
  }
  //to delete the advertise
  advertiseMasterDel(ele) {
    if (!ele) {
      return;
    }
    const dialogref = this.dialog.open(AdvertiseDeleteComponent, {
      data: ele,
      hasBackdrop: false,
      disableClose: true
    });
    dialogref.afterClosed().subscribe(res => {
      if (res && res['isSubmit'] === true) {
        this.advertiseService.deleteAdvertseMaster(res ? res.spot_number : null).subscribe(ele => {
          this.snackbar.snackbars("Deleted Successfully", "info-snackbar");
          this.cdref.markForCheck();
        });
      } else {
        this.snackbar.snackbars("Cannot Delete Advertise", "error-snackbar");
      }
    });
  }
  //Add the advertise
  addBanerSection() {
    const dialogref = this.dialog.open(AdvertiseMasterComponent, {
      width: "300px",
      data: {
        editable: false,
      },
    });
    dialogref.afterClosed().subscribe(res => {
      if (res && res.data && res.data == true) {
        this.getAllAdvertiseMaster();
        this.cdref.markForCheck();
      }
    })
  }
  //filter by advertise
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}