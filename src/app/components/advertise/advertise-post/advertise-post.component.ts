import { Component, OnInit, ChangeDetectorRef, Input, Inject } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { AdvertiseService } from "src/app/services/advertsise";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import { SnackbarService } from 'src/app/services/snackbar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdvertiseModel } from 'src/app/models/advertise';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import * as uuid from "uuid";
import { PaymentService } from 'src/app/services/payment';
import { advertisedata } from '../../profile-section/profile/profile.component';
import { ProfileService } from 'src/app/services/profile';
import { Router } from '@angular/router';
declare var Razorpay: any;

@Component({
  selector: "app-advertise-post",
  templateUrl: "./advertise-post.component.html",
  styleUrls: ["./advertise-post.component.scss"],
})
export class AdvertisePostComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  spotList: any;
  selectedSpotList: any;
  spotListTempId: any;
  spotHide: boolean = false;
  public amount: any;
  public showpay: boolean = false;
  public selectedFile: any;
  paymentSuccess = false;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "10rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [
      [
        "undo", "redo", "strikeThrough", "subscript", "superscript", "justifyLeft", "justifyCenter", "justifyRight",
        "indent", "outdent", "insertUnorderedList", "insertOrderedList", "heading", "fontName", "fontSize",
        "textColor", "backgroundColor", "customClasses", "insertHorizontalRule", "removeFormat", "toggleEditorMode",
      ],
    ],
  };

  public _data: AdvertiseModel = {};
  @Input()
  get data() {
    return this._data;
  }
  set data(d) {
    this._data = d;
    this.cdref.markForCheck();
  }

  constructor(
    private advertiseService: AdvertiseService,
    private cdref: ChangeDetectorRef,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AdvertisePostComponent>,
    private context: ApplicationContext,
    private paymentservice: PaymentService,
    @Inject(MAT_DIALOG_DATA) public item: advertisedata,
    private profileservice: ProfileService,
    private route: Router
  ) { }

  ngOnInit() {
    if (!this.context && !this.context.getData(ContextDataItem.LOGGEDIN)) {
      this.route.navigate([`home`]);
    }
    this.SpotList();
  }
  //to get the spot list master array
  SpotList() {
    this.advertiseService.advertiseMasterAll().subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.spotList = res["metaData"];
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.SUCCESS;
        } else {
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.FAILED;
        }
      },
      (err) => {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
      }
    );
    this.cdref.markForCheck();
  }
  //post the advertise
  AdvertiseAdd() {
    if (!this.showpay) {
      return null;
    }
    const userID = this.context.getData(ContextDataItem.USER_ID);//to get the userid via context
    this.data.adTrainerID = userID ? userID : '';//update the userid
    this.selectmenu(this.data ? this.data : '');//move toselectmenu function
  }
  //to select the banner type
  AdSpotSelect(data) {
    if (!data) { //If no data condition
      this.spotHide = false;
      this.paycondition();
      return;
    }
    this.amount = data ? data.spot_amount : '';//settimg the amount per day
    this.data.adDays = data ? data.spot_days : '';//No of days
    this.data.adAmount = data ? data.spot_amount : '';//setting the final amount 
    this.data.ad_spot = data ? data.spot_number : ''; //to set the spot id
    this.spotHide = true;//changing spothide value
    this.paycondition();
    this.cdref.markForCheck();
  }
  //to select the finalamount based on the days
  daysSelect(data) {
    if (!data) {
      return;
    }
    this.data.adAmount = data * this.amount; //changing finala amount based on the days selected
    this.paycondition();
    this.cdref.markForCheck();
  }
  //condition for the pay option
  paycondition() {
    if (this.data) {
      this.data.ad_title && this.data.ad_description && this.data.ad_startDate && this.data.adDays &&
        this.data.adAmount && this.data.ad_spot && this.selectedFile ? this.showpay = true : this.showpay = false;
      this.cdref.markForCheck();
    }
  }

  public static getRPOptions() {
    return {
      key: "",
      amount: "",
      currency: "INR",
      name: "THE FIT SOCIAL",
      description: "Advertisement Registration",
      image: "https://maiora-images.maiora.co/FITSOCIAL/logo/FitSocialBlack.jpg",
      order_id: "",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: "",
      theme: {
        color: "#000",
      },
    };
  }

  selectmenu(data) {
    const razorPayOptions = AdvertisePostComponent.getRPOptions();
    const updatable = {
      amount: data && data.adAmount ? data.adAmount * 100 : '',
      reciptId: uuid.v4(),
      notes: {
        title: data && data.ad_title ? data.ad_title : '',
        start_date: data && data.ad_startDate ? data.ad_startDate : '',
        description: data && data.ad_description ? data.ad_description : '',
        spot: data && data.ad_spot ? data.ad_spot : '',
        trainer_id: this.data && this.data.adTrainerID ? this.data.adTrainerID : '',
        total_amount_paid: data && data.adAmount ? data.adAmount : '',
        days: data && data.adDays ? +data.adDays : '',
        trainer_name: this.context ? this.context.getData(ContextDataItem.USER_NAME) : '',
        trainer_mail: this.context ? this.context.getData(ContextDataItem.USER_MAIL) : '',
      }
    };
    var razorkey = this.context.getData(ContextDataItem.RAZORKEY);
    this.paymentservice.ordergenerate(updatable).subscribe(
      (res) => {
        const rpOpder = res["metaData"];
        razorPayOptions.key = razorkey;
        razorPayOptions.order_id = rpOpder.id;
        razorPayOptions.amount = rpOpder.amount;
        razorPayOptions.prefill.name = this.item && this.item.name ? this.item.name : '';
        razorPayOptions.prefill.email = this.item && this.item.email ? this.item.email : '';
        razorPayOptions.prefill.contact = this.item && this.item.contact ? this.item.contact : '';
        razorPayOptions["handler"] = this.addtheadvertise.bind(this, data);
        razorPayOptions.notes = rpOpder.notes;
        const rzp1 = new Razorpay(razorPayOptions);
        rzp1.open();
        this.cdref.markForCheck();
      },
      (err) => { }
    );
  }
  //To change the profile pic
  addimageforadvertise(id) {
    const fd = new FormData();
    fd.append("picture", this.selectedFile ? this.selectedFile : '', this.selectedFile.name);
    fd.set("type", "ADVERTISE");
    fd.set("key", id ? id : '');
    fd.set("picture", this.selectedFile ? this.selectedFile : '');
    this.profileservice.AdvertiseImageUpload(fd ? fd : '').subscribe(res => {
      this.cdref.markForCheck();
    },
      (err) => { }
    );
  }
  //when image selected
  imageselection(event) {
    this.selectedFile = event.target.files[0];
    this.paycondition();
    this.cdref.markForCheck();
  }
  //add the advertise
  addtheadvertise(data, response) {
    const updatable = {
      advertisement_title: data && data.ad_title ? data.ad_title : '',
      advertisement_start_date: data && data.ad_startDate ? data.ad_startDate : '',
      advertisement_description: data && data.ad_description ? data.ad_description : '',
      advertisement_spot: data && data.ad_spot ? data.ad_spot : '',
      trainer_id: this.data && this.data.adTrainerID ? this.data.adTrainerID : '',
      amount_paid: data && data.adAmount ? data.adAmount : '',
      addvertising_days: data && data.adDays ? +data.adDays : '',
      rp_orderId: response && response.razorpay_order_id ? response.razorpay_order_id : '',
      rp_paymentId: response && response.razorpay_payment_id ? response.razorpay_payment_id : '',
      rp_payment_response_json: response && response.razorpay_signature ? response.razorpay_signature : ''
    };
    this.advertiseService.advertisePostUser(updatable ? updatable : '').subscribe(res => {
      if (res && res["metaData"]) {
        alert("Advertisement has been added successlly");
        this.paymentSuccess = true;
        this.addimageforadvertise(res && res.metaData && res.metaData.length ? res.metaData[0].advertisement_id : '');
        this.cdref.markForCheck();
      }
    }, (err) => {
      this.snackbar.snackbars("Please provide proper details", "error-snackbar");
    }
    );
  }
}
