import { BatchService } from 'src/app/services/batch';
import { PageManager, PageAction, PageStatus } from "./../../models/page";
import { Component, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "src/app/services/event";
import { MatDialog } from "@angular/material";
import { ApplicationContext, ContextDataItem, ContextActionListencer, ContextEvents } from "src/app/util/context/applicationContext";
import { ReviewService } from "src/app/services/review";
import { SubscriptionService } from 'src/app/services/subscription';
import { CoupanService } from 'src/app/services/coupan';
import { ShareDialogComponent } from 'src/app/components/dialog/share-dialog/share-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar';
import * as uuid from "uuid";
import { PaymentService } from 'src/app/services/payment';
import { ProfileService } from 'src/app/services/profile';
import { LoginComponent } from 'src/app/components/Authentication/login/login.component';
declare var Razorpay: any;

@Component({
  selector: "app-eventinfo",
  templateUrl: "./eventinfo.component.html",
  styleUrls: ["./eventinfo.component.scss"],
})
export class EventinfoComponent implements AfterViewInit {
  pageManager: PageManager = new PageManager();
  reviews: any;
  eventId;
  uuId;
  selectedEvent: any = [];
  selectedReviews: any = [];
  Listsubscriptions: any = [];
  ListCoupons: any = [];
  @ViewChild('hidden', { static: true }) hidden: ElementRef;
  isReview = false;
  selectedSubscription: any;
  isLoaded = false;
  _batchesList = [];
  selectedBatchs: any = [];
  selectedBatch: any = {};
  batchselection: any;
  paymentShow = true;
  promoCode: any;
  offersCardShow = false;
  couponId: number;
  couponvalue: any = [];
  discountpercent: any;
  amount: any;
  userId: any;
  userrole: any;
  user: any = [];
  label: any;
  paymentSuccess = false;
  selectedValue: number;
  stars: number[] = [1, 2, 3, 4, 5];
  ratingvalue: any;

  constructor(
    private cdref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private eventservice: EventService,
    private context: ApplicationContext,
    private route: Router,
    private reviewservice: ReviewService,
    private dailog: MatDialog,
    private batchService: BatchService,
    private subscribeService: SubscriptionService,
    private snackbar: SnackbarService,
    private couponservice: CoupanService,
    private dialog: MatDialog,
    private paymentservice: PaymentService,
    private profileservice: ProfileService
  ) { }

  ngAfterViewInit() {
    // this.listenToUrl();
    //  this.contextlistener();
    if (this.context.getData(ContextDataItem.TOKEN_KEY) && this.context.getData(ContextDataItem.TOKEN_VALUE)) {
      this.listenToUrl(); //call the event section when the token is generated
    }
    this.contextlistener(); //listen to context
  }
  //Listen to the URL
  private listenToUrl() {
    this.activatedRoute.params.subscribe((res) => {
      this.uuId = res.eventId;
      setTimeout(() => {
        this.getevent();
      }, 2000);
      this.cdref.markForCheck();
    });
  }
  //Listen to the context
  contextlistener() {
    this.context.listener.subscribe((res: ContextActionListencer) => {
      if (res.event === ContextEvents.VALUDE_CHANGED) {
        this.userId = this.context.getData(ContextDataItem.USER_ID);
        if (res.data && res.data.key && res.data.key === ContextDataItem.TOKEN_VALUE) {
          this.listenToUrl();
          this.cdref.markForCheck();
        }
      }
    });
  }
  //get event details
  getevent() {
    this.eventservice.eventinfobyuuid(this.uuId ? this.uuId : '').subscribe(
      (res) => {
        if (res["metaData"]) {
          this.context.setData(ContextDataItem.EVENT_ID, res['metaData'][0].event_id);
          this.selectedEvent = res["metaData"][0];
          this.eventId = this.selectedEvent.event_id;
          this.getSubscriptions(this.selectedEvent.uuid);
          this.getcoupons(this.selectedEvent.uuid);
          this.getreview(this.selectedEvent.uuid);
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
        this.route.navigate([`home`]);
        this.cdref.markForCheck();
      }
    );
  }
  //get subscription details
  getSubscriptions(uuid) {
    this.subscribeService.subscriptionByuuID(uuid ? uuid : '').subscribe(
      (res) => {
        this.Listsubscriptions = res["metaData"].map((pack) => {
          return Object.assign({}, pack, {
            isFree: +pack.amount === 0 ? true : false,
          });
        });
      }
    );
    this.cdref.markForCheck();
  }
  //get coupon details
  getcoupons(uuid) {
    this.couponservice.coupanByID(uuid ? uuid : '').subscribe((res) => {
      if (res && res['metaData'] && res.metaData.length !== 0) {
        this.ListCoupons = res['metaData'];
        this.cdref.markForCheck();
      }
    });
  }
  //get reviews details
  getreview(uuid) {
    if (uuid) {
      this.reviewservice.reviewAllbyEventID(uuid ? uuid : '').subscribe(res => {
        this.selectedReviews = res['metaData'];
        var reviewtotal: number = 0;
        for (var i = 0; i < this.selectedReviews.length; i++) {
          if (this.selectedReviews[i].ratings) {
            reviewtotal = reviewtotal + +this.selectedReviews[i].ratings;
            this.ratingvalue = Math.ceil(reviewtotal / (i + 1));
          }
        }
        this.cdref.markForCheck();
      });
    }
  }
  //To open the share dialog
  openDialog(event) {
    if (event) {
      this.context.setData(ContextDataItem.EVENT_NAME, event ? event : '');
      this.dialog.open(ShareDialogComponent, {
        width: '500px'
      });
    }
  }
  //get the userid via the context
  getuseridviacontext() {
    this.userId = this.context.getData(ContextDataItem.USER_ID);
  }
  //review API call
  review(obj) {
    const updatable = {
      user_id: this.userId,
      event_id: this.eventId,
      ratings: this.selectedValue ? this.selectedValue : '',
      review: obj,
    };
    if (!obj) { //If there is no review
      delete updatable.review;
    }
    this.reviewservice.addReview(updatable).subscribe(
      (res) => {
        this.reviewstatuschange(); //change the review status
        this.snackbar.snackbars("Review submitted successfully", "info-snackbar");
        this.getreview(this.uuId ? this.uuId : ''); //get the reviews based on event uuid
      },
      (err) => {
        this.snackbar.snackbars("Unable to submit your review", "error-snackbar");
      }
    );
  }
  //review status change
  reviewstatuschange() {
    this.isReview = !this.isReview;
    this.selectedValue = null;
    this.reviews = null;
    this.cdref.markForCheck();
  }
  //when review submit button clicked
  reviewclick(obj) {
    const loggedin = this.context.getData(ContextDataItem.LOGGEDIN);
    if (!loggedin) {
      const dialogref = this.dailog.open(LoginComponent);
      dialogref.afterClosed().subscribe((result) => {
        if (result && result.message) {
          this.getuseridviacontext(); //to get the userid
          var p = this.checkreview(this.userId ? this.userId : '');
          p === null ? this.review(obj) : this.updatereview(p ? p : '', obj ? obj : '');
        }
      });
    } else {
      this.getuseridviacontext();
      var p = this.checkreview(this.userId ? this.userId : '');
      p === null ? this.review(obj) : this.updatereview(p ? p : '', obj ? obj : '');
    }
  }
  //check the review status
  checkreview(userId) {
    if (userId && this.selectedReviews) {
      for (var i = 0; i < this.selectedReviews.length; i++) {
        if (this.selectedReviews[i].user_id === userId) {
          return this.selectedReviews[i];
        }
      }
      return null;
    }
  }
  //update the review based on uuid
  updatereview(obj, model) {
    var update = {
      review: model ? model : obj.review, //if no review then use the old review only
      ratings: this.selectedValue ? this.selectedValue : obj.ratings //send the ratings
    }
    if (!update.review) { //If there is no review then donot send the review
      delete update.review;
    }
    this.reviewservice.updatereview(obj && obj.UUID ? obj.UUID : '', update ? update : '').subscribe(res => {
      this.reviewstatuschange(); //to change the review status
      this.snackbar.snackbars("Review updated successfully", "info-snackbar");
      this.getreview(res && res.metaData ? res.metaData.status[0].Event.uuid : ''); //get api call to get the review by event uuid
    });
  }
  //when the subscription card is clicked
  subscriptionClick(item) {
    this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
    const loggedIn = this.context.getData(ContextDataItem.LOGGEDIN);
    if (!loggedIn) {
      const dialogref = this.dialog.open(LoginComponent);
      dialogref.afterClosed().subscribe((result) => {
        if (result && result.message) {
          this.subscriptionClick(item);
        } else {
          return false;
        }
      });
    } else {
      this.selectedSubscription = item;
      this.amount = +this.selectedSubscription.amount + ((+this.selectedSubscription.tax * +this.selectedSubscription.amount) / 100);
      this.amount = Math.ceil(this.amount);
      this.couponvalue = [];
      this.selectedBatchs = [];
      this.getbatchs(item);
      this.isLoaded = true;
      this.cdref.markForCheck();
    }
  }
  //To get the list of batches based on subscription uuid
  getbatchs(item) {
    this.batchService.getbatchBySubscription(item.uuid).subscribe(res => {
      if (res && res.metaData) {
        const serviceData = res ? res.metaData : [];
        this.cdref.markForCheck();
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.SUCCESS;
        this._batchesList = serviceData && serviceData.map(k => {
          return Object.assign({}, k, {
            start_time_new: this.timeformat(k.start_time),
            end_time_new: this.timeformat(k.end_time)
          });
        });
        this.loadInitActions();
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
  //time format coversion from 24 hrs to 12 hrs and adding am and pm after the time
  timeformat(k) {
    let timeString = k;
    const H = +timeString.substr(0, 2);
    const h = (H % 12) || 12;
    const ampm = H < 12 ? ' AM' : ' PM';
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }
  //To separate the start time and the end time.
  loadInitActions() {
    if (this._batchesList) {
      this._batchesList.map(batches => {
        batches['label_batch'] = `${batches.start_time_new} - ${batches.end_time_new} (${batches.has_limit ? batches.available_seats : 'un-restricted'} seats)`;
        batches['label_day'] = '';
        try {
          batches['frequency_config_parsed'] = JSON.parse(JSON.parse(batches['frequency_config']));
        } catch (e) { }
      });
    }
  }
  //when the timings is selected, to get stored in selectedBatch
  sessionClick(item) {
    // verify seat availability
    if (item['has_limit'] && !item['available_seats']) {
      this.snackbar.snackbars("There are no slots in this batch", "info-snackbar");
      return;
    }
    this.selectedBatch = item;
    this.cdref.markForCheck();
    return false;
  }
  //when the days is selected, to get stored in selectedBatch['label_day']
  chooseDays(item) {
    /** Pre populating Data */
    this.selectedBatch['label_day'] = item;
  }
  //add both the timings and day to the batchselection
  addCheckListItem() {
    // No Batches are selected
    if (!this.selectedBatchs) {
      this.selectedBatchs.push({});
      this.cdref.markForCheck();
      return;
    }
    if (!this.selectedBatch || !this.selectedBatch['label_batch']) {
      this.snackbar.snackbars("Batch time must be choosen", "info-snackbar");
      return;
    }
    // Verify the batch size limit
    if (this.selectedBatchs.length >= this.selectedSubscription.batch_count) {
      this.snackbar.snackbars("You have choosen all the batches", "info-snackbar");
      return;
    }
    // Add a new batch
    this.selectedBatchs.push({ ...this.selectedBatch });
    this.batchselection = this.selectedBatchs;
    this.selectedBatch = {};
    this.cdref.markForCheck();
  }
  //TO remove the selected batch
  removeCheckListItem(index) {
    this.selectedBatchs.splice(index, 1);
    if (this.selectedBatchs.length === this.selectedSubscription.batch_count) {
      this.paymentShow = false;
    } else {
      this.paymentShow = true;
    }
    this.cdref.markForCheck();
  }
  //To test the public coupons
  prepopulateData(item) {
    this.offersCardShow = !this.offersCardShow
    this.couponId = item.coupon_id
    this.couponvalue = item.title;
    this.discountpercent = item.discount_percent;
    this.amount = (+this.selectedSubscription.amount - ((+this.discountpercent * +this.selectedSubscription.amount) / 100));
    this.amount = this.amount + ((+this.selectedSubscription.tax * this.amount) / 100);
    this.amount = Math.ceil(this.amount);
    this.cdref.markForCheck();
  }
  //To test the private coupons
  applycoupon(code, eventId) {
    this.couponservice.privatecoupon(code, eventId).subscribe((res) => {
      if (res && res['metaData'] && res['metaData'].isPrivate === 1) {
        this.snackbar.snackbars("Promo Code has been Applied successfully", "sucess-snackbar");
        this.couponId = res.metaData.coupon_id
        this.couponvalue = res.metaData.title;
        this.discountpercent = res.metaData.discount_percent;
        this.amount = (+this.selectedSubscription.amount - ((+this.discountpercent * +this.selectedSubscription.amount) / 100));
        this.amount = this.amount + ((+this.selectedSubscription.tax * this.amount) / 100);
        this.amount = Math.ceil(this.amount);
        this.cdref.markForCheck();
      }
    }, err => {
      this.snackbar.snackbars("Invalid Prome Code", "error-snackbar");
    })
    this.promoCode = '';
    this.cdref.markForCheck();
  }
  //remove the coupon selected
  removecoupon() {
    this.amount = +this.selectedSubscription.amount + ((+this.selectedSubscription.tax * +this.selectedSubscription.amount) / 100);
    this.amount = Math.ceil(this.amount);
    this.couponId = null;
    this.couponvalue = null;
    this.discountpercent = null;
    this.cdref.markForCheck();
  }
  //To copy the current event page
  shareevent() {
    var url = window.location.href;
    if (url) {
      window.navigator.clipboard.writeText(url);
      this.snackbar.snackbars("Successfully Copied", "info-snackbar");
    }
  }
  //payment process
  subscribe() {
    window.scrollTo(0, 0);
    const loggedIn = this.context.getData(ContextDataItem.LOGGEDIN);
    if (!loggedIn) {
      const dialogref = this.dialog.open(LoginComponent);
      dialogref.afterClosed().subscribe((result) => {
        if (result && result.message) {
          this.subscribe();
        } else {
          return false;
        }
      });
    }
    const uuID = this.context.getData(ContextDataItem.UUID);
    this.eventservice.registeredusers(uuID).subscribe((res) => {
      const events = res['metaData'];
      const value = events.filter(x => x.event_id === this.selectedEvent.event_id);
      if (value && value.length) { //To check already subscribed to the evenbt or not
        this.snackbar.snackbars("You have already subscribed to this event", "info-snackbar");
        return;
      } else { //If not continue to the order generation and payment
        this.ordercreation();
        this.cdref.markForCheck();
      }
    });
  }
  //ordercreation
  ordercreation() {
    const userrole = this.context.getData(ContextDataItem.USER_ROLE);
    if (userrole == 3) {
      if (+this.amount <= 1) { // This is a free pack, requires no Payment
        const updatable = {
          razorpay_order_id: "",
          razorpay_payment_id: "",
        };
        this.razorPayResponsehandler(this.selectedEvent, this.batchselection, updatable);
        return;
      }
      this.userdetails(); //To get the user information
      var batchesid = this.batchselection.map(b => {
        return b.batches_id
      });
      const razorPayOptions = EventinfoComponent.getRPOptions();
      var username = this.context.getData(ContextDataItem.USER_NAME);
      const updatable = {
        amount: +this.amount * 100,
        reciptId: uuid.v4(),
        notes: {
          eventId: this.selectedEvent.event_id,//EventId
          event_name: this.selectedEvent.event_name,//EventName
          event_uuid: this.selectedEvent.uuid,
          user_name: username,//Username
          trainer_name: this.selectedEvent.Instructor.diaplay_name,//Trainername
          trainer_page: this.selectedEvent.Instructor.pageName,//Trainerpagename
          userId: this.user.user_id,//userID
          couponId: this.couponId,//coupon id
          batchesId: batchesid + "",//batches
          coupon_name: this.couponvalue,//coupon name
          coupon_discount_percent: this.discountpercent,//coupon percent
          subscriptionId: this.batchselection[0].Subscription.subscription_id,
          subscription_days: this.selectedSubscription.days,//no of days
          subscription_amount: +this.selectedSubscription.amount,//subscription amount
          tax: +this.selectedSubscription.tax,//tax on subscription
          final_amount: +this.amount,//final amount 
        }
      };
      if (!this.couponId) {//If coupons are not applied
        delete updatable.notes.couponId,
          delete updatable.notes.coupon_name,
          delete updatable.notes.coupon_discount_percent
      }
      var razorkey = this.context.getData(ContextDataItem.RAZORKEY); //get the razor key via context
      this.paymentservice.ordergenerate(updatable).subscribe( //order creation
        (res) => {
          const rpOpder = res["metaData"];
          razorPayOptions.key = razorkey;
          razorPayOptions.order_id = rpOpder.id;
          razorPayOptions.amount = rpOpder.amount;
          razorPayOptions.prefill.name = this.user.diaplay_name;
          razorPayOptions.prefill.email = this.user.email_id;
          razorPayOptions.prefill.contact = this.user.mobile_number;
          razorPayOptions["handler"] = this.razorPayResponsehandler.bind(this, this.selectedEvent, this.batchselection);
          razorPayOptions.notes = rpOpder.notes;
          const rzp1 = new Razorpay(razorPayOptions);
          rzp1.open(); //open the razor pay dialog
          this.cdref.markForCheck();
        },
        (err) => { }
      );
    } else {
      this.snackbar.snackbars("You Cannot Proceed further", "sucess-snackbar"); //if trainer or admin cant proceed further
    }
  }
  //After receiving response from the razor-pay
  razorPayResponsehandler(event, subs, response): void {
    this.label = subs.map(b => {
      return {
        batch_id: b.batches_id,
        day_of_week: b.label_day
      }
    });
    const userID = this.context.getData(ContextDataItem.USER_ID);
    const updatable = {
      user_id: userID,
      subscription_id: subs[0].Subscription.subscription_id,
      event_id: event.event_id,
      coupon_id: this.couponId,
      final_amount: +this.amount,
      status: "PAID",
      rp_orderId: response.razorpay_order_id || null,
      rp_paymentId: response.razorpay_payment_id || null,
      rp_payment_response_json: JSON.stringify(response) || "",
      batches: this.label
    };
    this.paymentservice.paymentgeneratenew(updatable).subscribe(
      (res) => {
        if (res) {
          this.paymentSuccess = true;
          setTimeout(() => {
            (this.hidden.nativeElement as HTMLElement).click();
          }, 100);
        }
      },
      (err) => { this.snackbar.snackbars("Failed,please try again", "error-snackbar"); }
    );
  }
  //Razor pay credentails
  public static getRPOptions() {
    return {
      key: "",
      amount: "",
      currency: "INR",
      name: "THE FIT SOCIAL",
      description: "Event Subscription",
      image: "https://maiora-images.maiora.co/FITSOCIAL/logo/FitSocialBlack.jpg",
      order_id: "",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: "",
      theme: { color: "#000" },
    };
  }
  //To get the particular user details
  userdetails() {
    const uuid = this.context.getData(ContextDataItem.UUID);
    this.profileservice.getprofiledetails(uuid).subscribe((res) => {
      this.user = res["metaData"];
      this.cdref.markForCheck();
    });
  }
  //To show the success page
  sucesspage() { }
  //to get the rating value
  countStar(star) {
    this.selectedValue = star;
    this.cdref.markForCheck();
  }
}
