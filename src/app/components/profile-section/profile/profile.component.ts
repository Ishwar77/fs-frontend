import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApplicationContext, ContextDataItem, ContextActionListencer, ContextEvents } from 'src/app/util/context/applicationContext';
import { ProfileService } from 'src/app/services/profile';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { SnackbarService } from 'src/app/services/snackbar';
import { RewardService } from 'src/app/services/rewards';
import { MatDialog } from '@angular/material';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { Router } from '@angular/router';
import { ShareDialogComponent } from '../../dialog/share-dialog/share-dialog.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { RatingService } from 'src/app/services/ratings';
import { AdvertisePostComponent } from '../../advertise/advertise-post/advertise-post.component';
import { AdvertiseService } from 'src/app/services/advertsise';

export interface editdata {
  menus: any;
}
export interface invitedata {
  link: any;
}
export interface advertisedata {
  name: any;
  contact: any;
  email: any;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public expanded: boolean = false;
  pageManager: PageManager = new PageManager();
  public editable: boolean = false;
  public userrole: any;
  public selectedFile: any;
  public menus: any = [];
  public rewards: any = [];
  public fitdetails: any = [];
  public bmistatus: any;
  public name: any;
  public contact: any;
  public designation: any;
  public pagename: any;
  public rewardpoints: any;
  public ratingvalue: any;
  advertiseListAll: any;
  isFirstTabVisible: any = true; isSecondTabVisible: any; isThirdTabVisible: any; isFourthTabVisible: any;
  isFifthTabVisible: any; isSixthTabVisible: any; isSeventhTabVisible: any; isEighthTabVisible: any;
  config: AngularEditorConfig = {
    editable: true, spellcheck: true, height: '10rem', minHeight: '5rem', placeholder: 'Enter text here...',
    translate: 'no', defaultParagraphSeparator: 'p', defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['undo', 'redo', 'strikeThrough', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter', 'justifyRight',
        'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'heading', 'fontName', 'fontSize', 'textColor',
        'backgroundColor', 'customClasses', 'insertHorizontalRule', 'removeFormat', 'toggleEditorMode']
    ]
  };

  constructor(
    private context: ApplicationContext,
    private cdref: ChangeDetectorRef,
    private profileservice: ProfileService,
    private advertiseService: AdvertiseService,
    private snackbar: SnackbarService,
    private rewardservice: RewardService,
    private dialog: MatDialog,
    private route: Router,
    private ratingservice: RatingService
  ) { }

  ngOnInit() {
    if (!this.context || !this.context.getData(ContextDataItem.LOGGEDIN)) {
      this.route.navigate(['home']);
      return false;
    }
    this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
    const uuid = this.context.getData(ContextDataItem.UUID);
    const userid = this.context.getData(ContextDataItem.USER_ID);
    this.getprofile(uuid);
    this.getAdvertise();

    this.getallrewards(uuid);
    this.userrole == 6 ? this.getratings(userid ? userid : '') : '';
  }
  //get the advertise details
  getAdvertise() {
    this.advertiseService.advertiseGetAll().subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.advertiseListAll = res["metaData"];
          // this.pageManager.status = PageStatus.READY;
          // this.pageManager.action = PageAction.SUCCESS;
        } else {
          // this.pageManager.status = PageStatus.READY;
          // this.pageManager.action = PageAction.FAILED;
        }
        this.cdref.markForCheck();
      },
      (err) => {
        // this.pageManager.status = PageStatus.READY;
        // this.pageManager.action = PageAction.FAILED;
        this.cdref.markForCheck();
      }
    );
  }
  //To get the profile details
  getprofile(uuid) {
    this.profileservice.getprofiledetails(uuid ? uuid : '').subscribe(
      (res) => {
        if (res && res["metaData"]) {
          this.menus = res["metaData"];
          this.name = this.menus.diaplay_name;
          this.contact = this.menus.mobile_number;
          this.designation = this.menus.designation;
          if (this.menus && this.menus.pageName && this.userrole == 6) {
            this.pagename = this.menus.pageName;
          }
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
  //get rating based on trainerid
  getratings(trainerId) {
    this.ratingservice.getbytrainer(trainerId ? trainerId : '').subscribe(res => {
      var ratingarray: any = [];
      var reviewtotal: number = 0;
      if (res && res.metaData.length) {
        ratingarray = res['metaData'];
        for (let i = 0; i < ratingarray.length; i++) {
          if (ratingarray[i].ratings) {
            reviewtotal = reviewtotal + ratingarray[i].ratings;
            this.ratingvalue = Math.ceil(reviewtotal / (i + 1));
          }
        }
      }
    });
  }
  //To copy message to the clipboard
  copyInputMessage(data) {
    if (data) {
      window.navigator.clipboard.writeText(data);
      this.snackbar.snackbars("Successfully Copied the Referal ID to Clipboard", "info-snackbar");
    }
  }
  //To change the profile pic
  onFileSelecte(event) {
    const userID = this.context.getData(ContextDataItem.USER_ID);
    this.selectedFile = event.target.files[0];
    const fd = new FormData();
    fd.append("picture", this.selectedFile, this.selectedFile.name);
    fd.set("type", "USER");
    fd.set("key", userID);
    fd.set("picture", this.selectedFile);
    this.profileservice.UserProfilePictureUpload(fd).subscribe(
      (res) => {
        if (res && res["metaData"]) {
          this.snackbar.snackbars("Profile Pic Updated Successfully", "info-snackbar");
          this.menus.profile_picture_url = res.metaData.profile_picture_url;
          this.context.setData(ContextDataItem.IMAGE_URL, res.metaData.profile_picture_url);
          this.cdref.markForCheck();
        }
      },
      (err) => {
        this.snackbar.snackbars("Profile Pic Cannot be Updated", "error-snackbar");
      }
    );
  }
  //Loading the data based on tab clicks
  onTabPanelClick(event, tab) {
    this.isFirstTabVisible = (event.index === 0) ? true : false;
    this.isSecondTabVisible = (event.index === 1) ? true : false;
    this.isThirdTabVisible = (event.index === 2) ? true : false;
    this.isFourthTabVisible = (event.index === 3) ? true : false;
    this.isFifthTabVisible = (event.index === 4) ? true : false;
    this.isSixthTabVisible = (event.index === 5) ? true : false;
    this.isSeventhTabVisible = (event.index === 6) ? true : false;
  }
  //To update the personal information
  save(value) {
    const updatable = {
      diaplay_name: this.menus.diaplay_name,
      mobile_number: this.menus.mobile_number,
      designation: this.menus.designation
    };
    if (value.designation === null) {
      delete updatable.designation;
    }
    this.profileservice.updateinfo(value.user_id, updatable).subscribe(
      (res) => {
        this.snackbar.snackbars("Updated Successfully", "sucess-snackbar");
        this.editable = !this.editable;
        this.getprofile(value.uuid);
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.snackbars("Can not Update the changes", "error-snackbar");
      }
    );
  }
  //To get the rewards service
  getallrewards(uuId) {
    if (!uuId) {
      return false;
    }
    this.rewardservice.getrewardsservice(uuId).subscribe((res) => {
      if (res["metaData"] && res["metaData"].length) {
        this.rewards = res["metaData"];
        this.rewardpoints = this.rewards[0].balance_points
        this.cdref.markForCheck();
      }
    },
      (err) => { }
    );
  }
  //To get the fitness details
  getadditionaldetails(uuid) {
    this.profileservice.getprofileadditionaldetails(uuid).subscribe((res) => {
      if (res['metaData']) {
        this.fitdetails = res['metaData'];
        if (this.fitdetails && this.fitdetails.BMI) {
          this.bmivalue(this.fitdetails.BMI);
        }
        this.cdref.markForCheck();
      }
    })
  }
  //To get the BMI status
  bmivalue(value) {
    if (value && value.length) {
      if (value <= 18.5) {
        this.bmistatus = 'Underweight';
      } else if (value < 25) {
        this.bmistatus = 'Normal Weight';
      } else if (value < 30) {
        this.bmistatus = 'Over Weight';
      } else {
        this.bmistatus = 'Obesity';
      }
    }
  }
  //To edit the profile
  editprofile(obj) {
    const dialogref = this.dialog.open(PersonalInfoComponent, {
      data: {
        menus: obj
      }
    });
    dialogref.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.getprofile(res.data.status.uuid);
        this.cdref.markForCheck();
      }
    })
  }
  //open the share dialog
  openDialog(obj) {
    if (obj) {
      this.dialog.open(ShareDialogComponent, {
        width: '500px', data: {
          link: obj
        }
      });
    }
  }
  //save about info of trainer
  saveaboutinfo() {
    const userid = this.context.getData(ContextDataItem.USER_ID);
    const updatable = {
      expertise_in: this.menus.expertise_in
    };
    this.profileservice.updateinfo(userid ? userid : '', updatable ? updatable : '').subscribe(res => {
      this.expanded = !this.expanded;
      this.snackbar.snackbars("About section updated successfully", "info-snackbar");
      this.getprofile(this.context.getData(ContextDataItem.UUID));
    }, err => {
      this.expanded = !this.expanded;
      this.snackbar.snackbars("Cannot update the about section", "error-snackbar");
    });
    this.cdref.markForCheck();
  }

  //route to public profile page
  routetopublicprofile(page) {
    if (page && this.userrole == 6) {
      this.route.navigate([`coach/${page ? page : ''}`]);
      this.cdref.markForCheck();
    }
  }
  //open the advertise dialog
  postAdvertise() {
    this.dialog.open(AdvertisePostComponent, {
      width: 'auto', data: {
        name: this.name ? this.name : '',
        contact: this.contact ? this.contact : '',
        email: this.menus && this.menus.email_id ? this.menus.email_id : ''
      }
    });
  }
}
