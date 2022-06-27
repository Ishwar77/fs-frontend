import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { ProfileModel } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SnackbarService } from 'src/app/services/snackbar';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class GalleryComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  menus: any = [];
  details: any = [];
  enableEdit = false;
  enableEdit2 = false;
  enableEdit3 = false;
  enableEdit4 = false;
  enableEditIndex = null;
  enableEditIndex2 = null;
  enableEditIndex3 = null;
  enableEditIndex4 = null;
  userID: any;
  userrole: any;
  fitnessvalue: any;
  uuid:any;
  config: AngularEditorConfig = {
    editable: false,spellcheck: true,height: '10rem',minHeight: '5rem',placeholder: 'Enter text here...',
    translate: 'no',defaultParagraphSeparator: 'p',defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['undo','redo','strikeThrough','subscript','superscript','justifyLeft','justifyCenter','justifyRight',
        'indent','outdent','insertUnorderedList','insertOrderedList','heading','fontName','fontSize','textColor',
        'backgroundColor','customClasses','insertHorizontalRule','removeFormat','toggleEditorMode']
    ]
  };

  public _data: ProfileModel = {};
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
    private profileservice: ProfileService,
    private snackbar: SnackbarService,
    private context: ApplicationContext,
    private route: Router
  ) { }

  ngOnInit() {
    if (!this.context || !this.context.getData(ContextDataItem.LOGGEDIN)) {
      this.route.navigate(['home']);
      return false;
    }
    this.data.bmi = '';
    this.userID = this.context.getData(ContextDataItem.USER_ID);
    this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
    this.uuid = this.context.getData(ContextDataItem.UUID);
    this.getprofile();
    this.getadditionaldetails();
  }
//To get the profile details
  getprofile() {
    this.profileservice.getprofiledetails(this.uuid).subscribe(
      (res) => {
        if (res["metaData"]) {
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
  //To get the fitness details
  getadditionaldetails() {
    this.profileservice.getprofileadditionaldetails(this.uuid).subscribe((res) => {
      if(res['metaData']) {
      this.details = res['metaData'];
      this.data.height = this.details.height;
      this.data.weight = this.details.weight;
      this.data.bmi = this.details.BMI;
      if (this.details) {
        this.fitnessvalue = true;
      }
      else {
        this.fitnessvalue = false;
      }
      this.cdref.markForCheck();
    }
    })
  }
//To add the fitness details
  addfitdetails() {
    const updatable = {
      user_id: this.userID,
      height: this.data.height,
      weight: this.data.weight,
      BMI: Math.round(this.data.weight / (this.data.height * 0.3048 * this.data.height * 0.3048)) + ''
    }
    if (!this.data.height && !this.data.weight) {
      updatable.BMI = '';
    }
    this.profileservice.addfitnessdetails(updatable).subscribe((res) => {
      this.getadditionaldetails();
      this.snackbar.snackbars("Added Successfully","sucess-snackbar");
      this.cdref.markForCheck();
    }, err => {
      this.getadditionaldetails();
      this.snackbar.snackbars("Can not Add","error-snackbar");
    })
  }
//To reset the data
  reset() {
    ProfileModel.clearall(this.data);
    this.cdref.markForCheck();
  }
//To copy message to the clipboard
  copyInputMessage(){
    if(this.menus && this.menus.uuid) {
      window.navigator.clipboard.writeText(this.menus.uuid);
      this.snackbar.snackbars("Successfully Copied the Referal ID to Clipboard","sucess-snackbar");
    }
  }
//To calculate the bmi value and show the status
  bmivalue() {
    if (this.data.bmi && this.data.bmi.length) {
      if (this.data.bmi <= 18.5) {
        return 'Underweight';
      } else if (this.data.bmi < 25) {
        return 'Normal Weight';
      } else if (this.data.bmi < 30) {
        return 'Over Weight';
      } else {
        return 'Obesity';
      }
    }
  }
//To change the edit status
  enableEditMethod(e, i) {
    this.enableEdit = e;
    this.enableEditIndex = i;
    this.cdref.markForCheck();
  }
  enableEditMethod2(f, j) {
    this.enableEdit2 = f;
    this.enableEditIndex2 = j;
    this.cdref.markForCheck();
  }
  enableEditMethod3(e, i) {
    this.enableEdit3 = e;
    this.enableEditIndex3 = i;
    this.cdref.markForCheck();
  }
  enableEditMethod4(e, i) {
    this.enableEdit4 = e;
    this.enableEditIndex4 = i;
    this.config.editable = true;
    this.cdref.markForCheck();
  }
//Password update change
  update() {
    if (this.data.cpassword === this.data.password) {
      const update = { password: this.data.password };
      this.profileservice.passwordupdate(this.userID, update).subscribe((res) => {
        this.snackbar.snackbars("Password has been updated successfully","sucess-snackbar");
          this.cdref.markForCheck();
        });
    }
  }
//Update the basic details
  save(value) {
    var updatable
    if(value === 1) {
      updatable = {
        diaplay_name: this.menus.diaplay_name,
        mobile_number: this.menus.mobile_number,
      //  pageName: this.menus.pageName
      };
    } else {
      updatable = {
        expertise_in: this.menus.expertise_in
      };
    }
    this.profileservice.updateinfo(this.userID, updatable).subscribe(
      (res) => {
        this.snackbar.snackbars("Updated Successfully","sucess-snackbar");
      this.getprofile();
        this.enableEdit = false;
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.snackbars("Can not save the changes","error-snackbar");
        this.enableEdit = false;
      }
    );
  }
//To save the fitness details
  savefitness() {
    const updatable = {
      height: this.data.height,
      weight: this.data.weight,
      BMI: Math.round(this.details.weight / (this.data.height * 0.3048 * this.data.height * 0.3048)) + ''
    };
    if (!this.data.height && !this.data.weight) {
      updatable.BMI = '';
    }
    this.profileservice.updatefitnessinfo(this.details.fitness_info_id, updatable).subscribe(
      (res) => {
        this.getadditionaldetails();
        this.snackbar.snackbars("Updated Successfully","sucess-snackbar");
        this.cdref.markForCheck();
        this.enableEdit3 = false;
      },
      (err) => {
        this.getadditionaldetails();
        this.snackbar.snackbars("Can not save the changes","error-snackbar");
        this.enableEdit3 = false;
      }
    );
  }
//To cancel the edit status
  cancel(obj) {
    if (obj === 1) {
      this.enableEdit = false;
      this.getprofile();
      this.cdref.markForCheck();
    } else {
      this.enableEdit3 = false;
      this.getprofile();
      this.cdref.markForCheck()
    }
  }
}