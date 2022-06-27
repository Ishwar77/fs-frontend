import { Component, OnInit, ChangeDetectorRef, ViewChild, Input, } from "@angular/core";
import { PageStatus, PageAction, PageManager } from "src/app/models/page";
import { MatDialog, MatDrawer, } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { SubscriptionService } from "src/app/services/subscription";
import { SubscriptionModel } from "src/app/models/subscription";
import { BatchService } from 'src/app/services/batch';
import { SliderPanelModel, SliderViewMode, SliderPanelResponse } from './subs-slider/model';
import { ContextEvents, ContextActionListencer, ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { MeetingDailogComponent } from 'src/app/components/dialog/meeting-dailog/meeting-dailog.component';
import { SnackbarService } from 'src/app/services/snackbar';

export interface batchdetails {
  batch: any;
}

@Component({
  selector: "app-batchmanage",
  templateUrl: "./batch-manage.component.html",
  styleUrls: ["./batch-manage.component.scss"],
})
export class BatchmanageComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  items: any = [];
  subs: any = [];
  eventId: any;
  UUId: any;
  selectedsubs: any;
  subscriptionId: any;
  frequency: any;
  sliderInput: SliderPanelModel;
  selectedCard: any;
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;

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
    private batchservice: BatchService,
    private subsservice: SubscriptionService,
    private activatedroute: ActivatedRoute,
    private context: ApplicationContext,
    private route: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listentoURL(); //listen to the url
    this.eventId = this.context.getData(ContextDataItem.EVENT_ID); //get the eventid from context
    this.getsubscription(); //get all the subscription for the event id
    this.getfrequencydata(); //get frequency data
  }

  listentoURL() {
    this.activatedroute.params.subscribe(res => {
      this.UUId = res.eventId;
      this.subscriptionId = this.context.getData(ContextDataItem.SUBSCRIPTION_ID);
      this.getbatchbysubscription(this.subscriptionId);
      this.cdref.markForCheck();
      this.context.listener.subscribe((res: ContextActionListencer) => {
        if (res.event === ContextEvents.VALUDE_CHANGED) {
          this.subscriptionId = this.context.getData(ContextDataItem.SUBSCRIPTION_ID);
          this.getbatchbysubscription(this.subscriptionId);
          this.cdref.markForCheck();
        }
      });
    });
  }
  //get batch details based on subscription uuid
  getbatchbysubscription(subscriptionID) {
    if (subscriptionID) {
      this.batchservice.batchbasedonsubs(subscriptionID).subscribe(
        (res) => {
          if (res["metaData"] && res["metaData"].length) {
            let customData = [];
            customData = res["metaData"];
            this.subs = customData && customData.map(ele => {
              return Object.assign({}, ele, {
                title: ele && ele['Frequency'] ? ele['Frequency'].frequency : '',
                showCounts: ele.batch_size
              });
            });
            this.subs = this.subs && this.subs.map(k => {
              return Object.assign({}, k, {
                start_time_new: this.timeformat(k.start_time),
                end_time_new: this.timeformat(k.end_time)
              });
            });
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
        });
    }
  }
  //time format coversion from 24 hrs to 12 hrs and adding am and pm after the time
  timeformat(k) {
    let timeString = k;
    const H = +timeString.substr(0, 2);
    const h = (H % 12) || 12;
    const ampm = H < 12 ? ' AM' : ' PM';
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }
  //get the frequency data
  getfrequencydata() {
    this.batchservice.getfrequency().subscribe((res) => {
      if (res && res['metaData']) {
        this.frequency = res["metaData"];
        this.cdref.markForCheck();
      }
    });
  }
  //delete the particular batch
  deletsubs(data) {
    if (data) {
      this.batchservice.deletebatch(data.id).subscribe(
        (res) => {
          setTimeout(() => {
            this.closeSlider();
            this.getbatchbysubscription(data.uuid);
            this.snackbar.snackbars("Deleted Successfully", "info-snackbar");
          }, 1000);
        },
        (err) => {
          this.snackbar.snackbars("Cannot Delete Batch", "error-snackbar");
        }
      );
    } else {
      return false;
    }
  }
  //get the subscription details based on event uuid
  getsubscription() {
    if (this.UUId) {
      this.subsservice.subscriptionByID(this.UUId).subscribe(
        (res) => {
          if (res["metaData"] && res["metaData"].length) {
            this.items = res["metaData"];
          }
          this.cdref.markForCheck();
        }
      );
    }
  }
  //open the slider
  openCreateSlider() {
    const sliderData = new SliderPanelModel();
    sliderData.subscription = this.items;
    sliderData.frequencylist = this.frequency;
    sliderData.sid = '';
    sliderData.starttime = '';
    sliderData.endtime = '';
    sliderData.haslimit = '';
    sliderData.batchsize = '';
    sliderData.frequency = '';
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
  save(data) { //save the data i.e., create
    this.addbatches(data);
  }
  update(data) { //update the batch details
    this.editthebatch(data);
  }
  delete(data) { //delete the particular batch
    this.deletsubs(data);
  }
  closeSlider() { //close the slider
    this.drawer.close();
  }
  //when the particular batch card is clicked
  getClickedCard(card) {
    if (!card) {
      return false;
    }
    this.selectedCard = card;
    this.selectedCard.isActive = true;
    this.cdref.markForCheck();
    const sliderData = new SliderPanelModel();
    sliderData.id = card.batches_id;
    sliderData.sid = card.subscription_id;
    sliderData.subscription = card.Subscription.days;
    sliderData.uuid = card.Subscription.uuid;
    sliderData.starttime = card.start_time;
    sliderData.endtime = card.end_time;
    sliderData.batchsize = card.batch_size;
    sliderData.frequency = card.Frequency.frequency;
    sliderData.frequency_config = card.frequency_config;
    sliderData.available = card.available_seats;
    sliderData.haslimit = card.has_limit;
    sliderData.metaData = this.selectedCard;
    sliderData.viewMode = SliderViewMode.INFO;
    this.openSlider(sliderData);
  }
  //add the batch
  addbatches(data) {
    const updatable = {
      event_id: this.eventId,
      start_time: data.starttime + "",
      end_time: data.endtime + "",
      has_limit: data.haslimit + "",
      batch_size: data.batchsize + "",
      frequency: +data.frequency,
      available_seats: data.batchsize + "",
      frequency_config: JSON.stringify(data.frequency_config),
      subscription_id: data.sid
    };

    if (data.haslimit === 0) {
      delete updatable.batch_size;
      delete updatable.available_seats;
    }
    this.batchservice.addbatch(updatable).subscribe(
      (res) => {
        this.closeSlider();
        this.getbatchbysubscription(data.uuid);
        this.snackbar.snackbars("Batch has been Added Successfully", "info-snackbar");
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.snackbars("Please provide proper details", "error-snackbar");
      }
    );
  }

  editthebatch(data) {
    var updatable;
    updatable = {
      start_time: data.starttime + "",
      end_time: data.endtime + "",
      batch_size: data.batchsize + "",
      // frequency: this.id,
      available_seats: data.available,
      frequency_config: JSON.stringify(data.frequency_config)
    };
    // if (this.id === 1) {
    //   updatable.frequency_config = JSON.stringify(this.daysList);
    // }
    if (data.haslimit === 0) {
      delete updatable.batch_size;
      delete updatable.available_seats;
    }
    this.batchservice.editbatch(data.id, updatable).subscribe(
      (res) => {
        this.closeSlider();
        this.getbatchbysubscription(data.uuid);
        this.snackbar.snackbars("Updated Successfully", "info-snackbar");
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.snackbars("Cannot Update, Error", "error-snackbar");
      }
    );
  }
  //To close the slider
  closingslider() {
    this.closeSlider();
  }
  //to move to batch summary page
  getbatchcard(batch) {
    this.route.navigate([`summary/attendence/${batch.uuid}`]);
    this.cdref.markForCheck();
  }
  //to open the meeting dialog open
  opendialog(batch) {
    const dialogref = this.dialog.open(MeetingDailogComponent, {
      width: '500px', data: {
        batch: batch
      }
    });
    dialogref.afterClosed().subscribe(result => {
      if (result && result.id) {
        const update = {
          inProgress: 1,
          batches_id: batch.batches_id
        }
        this.batchservice.resumebatch(batch.uuid, update).subscribe((res) => {
          this.getbatchbysubscription(result.id);
          this.cdref.markForCheck();
        })
      }
    })
  }
  //to view the attendance
  attendanceclicked(batch) {
    this.route.navigate([`summary/attendenceview/${batch.uuid}`]);
    this.cdref.markForCheck();
  }
}