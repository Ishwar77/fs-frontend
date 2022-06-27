import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from "@angular/core";
import { PageStatus, PageAction, PageManager } from "src/app/models/page";
import { MatSort, MatPaginator, MatDrawer } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { SubscriptionService } from "src/app/services/subscription";
import { SubscriptionModel } from "src/app/models/subscription";
import { ApplicationContext, ContextDataItem } from "src/app/util/context/applicationContext";
import { SliderPanelModel, SliderViewMode, SliderPanelResponse } from './subs-slider/model';
import { SnackbarService } from 'src/app/services/snackbar';

@Component({
  selector: "app-subscription-manage",
  templateUrl: "./subscription-manage.component.html",
  styleUrls: ["./subscription-manage.component.scss"],
})
export class SubscriptionManageComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];
  subs: any = [];
  dialoguedata: any;
  eventId: any;
  uuid: any;
  eventname: any;
  sliderInput: SliderPanelModel;
  loadingvalue: boolean = true;
  deletedata: any;
  selectedCard: any;
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public _data: SubscriptionModel = {};
  @Input()
  get data() {
    return this._data;
  }
  set data(d) {
    this._data = d;
    this.cdref.markForCheck();
  }

  constructor(
    private cdref: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private subsservice: SubscriptionService,
    private activatedroute: ActivatedRoute,
    private context: ApplicationContext

  ) { }

  ngOnInit() {
    this.listentourl();
    this.eventId = this.context.getData(ContextDataItem.EVENT_ID);
  }

  listentourl() {
    this.activatedroute.params.subscribe(res => {
      this.uuid = res.eventId;
      this.getsubscriptionbyeventid();
    });
  }

  getsubscriptionbyeventid() {
    this.subsservice.subscriptionByID(this.uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.subs = res["metaData"];
          this.context.setData(ContextDataItem.SHOWBATCHES, true);
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.SUCCESS;
        } else {
          this.context.setData(ContextDataItem.SHOWBATCHES, false);
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

  deletsubs(data) {
    if (data) {
      this.subsservice.deletesubscription(data.id).subscribe(
        (res) => {
          setTimeout(() => {
            this.closeSlider();
            this.getsubscriptionbyeventid();
            this.snackbar.snackbars("Subscription Deleted Successfully", "sucess-snackbar");
          }, 1000);
        },
        (err) => {
          this.snackbar.snackbars("Cannot Delete Subscription", "error-snackbar");
        }
      );
    } else {
      return false;
    }
  }

  editsubscription(data) {
    const updatable = {
      event_id: +this.eventId,
      days: data.days + "",
      amount: data.amount + "",
      tax: data.tax + "",
      batch_count: data.batchs
    };
    this.subsservice.updatesubscription(data.id, updatable).subscribe(res => {
      this.closeSlider();
      this.getsubscriptionbyeventid();
      this.snackbar.snackbars("Updated Successfully", "sucess-snackbar");
      this.cdref.markForCheck();
    },
      (err) => {
        this.snackbar.snackbars("Cannot Update", "error-snackbar");
      }
    );
  }

  openCreateSlider() {
    const sliderData = new SliderPanelModel();
    sliderData.days = '';
    sliderData.amount = '';
    sliderData.tax = '';
    sliderData.batchs = '';
    sliderData.duration = '';
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
    this.addsubscription(data);
  }

  update(data) {
    this.editsubscription(data);
  }

  delete(data) {
    this.deletsubs(data);
  }

  addsubscription(data) {
    const updatable = {
      event_id: +this.eventId,
      days: data.days + "",
      amount: data.amount + "",
      tax: data.tax + "",
      batch_count: data.batchs,
      duration: 0
    };
    this.subsservice.addsubscription(updatable).subscribe(
      (res) => {
        this.closeSlider();
        this.snackbar.snackbars("Subscription has been Added Successfully", "sucess-snackbar");
        this.getsubscriptionbyeventid();
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.snackbars("Please provide proper details", "error-snackbar");
      }
    );
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
    const sliderData = new SliderPanelModel();
    sliderData.id = card.subscription_id;
    sliderData.days = card.days;
    sliderData.amount = card.amount;
    sliderData.tax = card.tax;
    sliderData.batchs = card.batch_count;
    sliderData.metaData = this.selectedCard;
    sliderData.viewMode = SliderViewMode.INFO;
    this.openSlider(sliderData);
    this.cdref.markForCheck();
  }
  closingslider() {
    this.closeSlider();
  }
}