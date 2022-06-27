import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatSort, MatPaginator, MatDialog, MatSnackBar, MatDrawer} from "@angular/material";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import { ActivatedRoute } from "@angular/router";
import { CoupanService } from "src/app/services/coupan";
import { SliderPanelModel, SliderViewMode, SliderPanelResponse } from './subs-slider/model';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';

export interface CoupanDataManage {
  event_id: any;
  title: any;
  discount_percent: any;
  max_discount_amount: any;
  max_usage_count: any;
  expiry: any;
  couponidvalue: any;
  eventidvalue: any;
  titlevalue: any;
  disamount: any;
  percentvalue: any;
  countvalue: any;
  expiryvalue: any;
}

@Component({
  selector: "app-coupan-manage",
  templateUrl: "./coupan-manage.component.html",
  styleUrls: ["./coupan-manage.component.scss"],
})
export class CoupanManageComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];
  subs: any = [];
  dialoguedata: any;
  eventId: any;
  uuid: any;
  eventname: any;
  loadingvalue: boolean = true;
  sliderInput: SliderPanelModel;
  selectedCard: any;
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  deletedata: any;
  displayedColumns: string[] = [
    "si",
    "title",
    "percent",
    "amount",
    "count",
    "credate",
    "expdate",
    "action",
  ];
  dataSource; // = new MatTableDataSource<CoupanDataManage>(this.subs);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private cdref: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private coupservice: CoupanService,
    private activatedroute: ActivatedRoute,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    this.listentourl();
    this.eventId = this.context.getData(ContextDataItem.EVENT_ID);
  }

  listentourl() {
    this.activatedroute.params.subscribe(res => {
      this.uuid =res.eventId;
      this.getcouponbyeventid();
    })
  }

  getcouponbyeventid() {
    this.coupservice.getallprivateandpubliccoupons(this.uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.subs = res["metaData"];
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletecoupon(data) {
    if (data) {
      this.coupservice.deletecoupon(data.id).subscribe(
        (res) => {
          setTimeout(() => {
            this.closeSlider();
            this.getcouponbyeventid();
            this.snackbar.open("Deleted Successfully", "", {
              duration: 3000,
              verticalPosition: "top",
              panelClass: ["sucess-snackbar"],
            });
          }, 1000);
        },
        (err) => {
          this.snackbar.open("Cannot Delete this coupon", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["error-snackbar"],
          });
        }
      );
    } else {
      return false;
    }
  }

  editcoupon(data) {
    const updatable = {
      event_id: this.eventId,
      title: data.title,
      discount_percent: data.discount_percent,
      max_discount_amount: data.max_discount_amount,
      max_usage_count: data.max_usage_count,
      expiry: data.expiry,
    };
    this.coupservice.updatecoupon(data.id, updatable)
      .subscribe(
        (res) => {
          this.closeSlider();
          this.getcouponbyeventid();
          this.snackbar.open("Updated Successfully", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["sucess-snackbar"],
          });
          this.cdref.markForCheck();
        },
        (err) => {
          this.snackbar.open("Coupon cannot be updated", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["error-snackbar"],
          });
        }
      );
  }

  openCreateSlider() {
    const sliderData = new SliderPanelModel();
    sliderData.title = '';
    sliderData.discount_percent = '';
    sliderData.max_discount_amount = '';
    sliderData.max_usage_count = '';
    sliderData.max_usage_count = '';
    sliderData.viewMode = SliderViewMode.CREATE;
    this.openSlider(sliderData);
  }

  private openSlider(data: SliderPanelModel) {
    if (!data) {
      return false;
    }
    this.sliderInput = data;
    this.cdref.markForCheck();
    this.drawer.open();

    this.sliderInput.listener.subscribe((res: SliderPanelResponse) => {
      // Current view mode is captured
      // if info, make edit; if edit make save, if save back to info
      switch (res.event) {
        case SliderViewMode.INFO:
          this.sliderInput.viewMode = SliderViewMode.EDIT;
          this.cdref.markForCheck();
          break;
        case SliderViewMode.CREATE:
          this.save(res.data);
          this.cdref.markForCheck();
          break;
        case SliderViewMode.EDIT:
          this.sliderInput.viewMode = SliderViewMode.INFO;
          this.update(res.data);
          this.cdref.markForCheck();
          break;
        case SliderViewMode.DELETE:
          //   this.sliderInput.viewMode = SliderViewMode.INFO;
          this.delete(res.data);
          this.cdref.markForCheck();
          break;
      }
    });
  }

  save(data) {
    this.addcoupon(data);
  }

  update(data) {
    this.editcoupon(data);
  }

  delete(data) {
    this.deletecoupon(data);
  }

  closeSlider() {
    this.drawer.close();
  }

  sliderCloseListener() {
    if (this.selectedCard) {
      this.selectedCard.isActive = false;
      this.selectedCard = null;
      this.cdref.markForCheck();
    }
  }
  
  getClickedCard(card) {
    if (!card) {
      return false;
    }
    this.selectedCard = card;
    this.selectedCard.isActive = true;
    this.cdref.markForCheck();
    const sliderData = new SliderPanelModel();
    sliderData.id = card.coupon_id;
    sliderData.title = card.title;
    sliderData.discount_percent = card.discount_percent;
    sliderData.max_discount_amount = card.max_discount_amount;
    sliderData.max_usage_count = card.max_usage_count;
    sliderData.expiry = card.expiry;
    sliderData.metaData = this.selectedCard;
    sliderData.viewMode = SliderViewMode.INFO;
    this.openSlider(sliderData);
  }

  addcoupon(data) {
    const updatable = {
      event_id: this.eventId,
      title: data.title,
      discount_percent: data.discount_percent,
      max_discount_amount: data.max_discount_amount,
      max_usage_count: data.max_usage_count,
      expiry: data.expiry,
      isPrivate: 0
    };
    if(data.type === 1) {
      updatable.isPrivate = 1
    }
    this.coupservice.addcoupon(updatable).subscribe(
      (res) => {
        this.closeSlider();
        this.getcouponbyeventid();
        this.snackbar.open("Coupon has been Added Successfully", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["sucess-snackbar"],
        });
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.open("Please provide proper details", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
      }
    );
  }
  closingslider() {
    this.closeSlider();
 }
}