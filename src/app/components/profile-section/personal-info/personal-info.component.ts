import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ProfileModel } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile';
import { SnackbarService } from 'src/app/services/snackbar';
import { ApplicationContext, ContextDataItem } from 'src/app/util/context/applicationContext';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { editdata } from '../profile/profile.component';

@Component({
  selector: 'app-personal-infos',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  userID: any;
  userrole: any;
  fitnessvalue: any;
  uuid: any;

  constructor(
    private cdref: ChangeDetectorRef,
    private profileservice: ProfileService,
    private snackbar: SnackbarService,
    private context: ApplicationContext,
    public dialogRef: MatDialogRef<PersonalInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public item: editdata,
  ) { }

  ngOnInit() {
    this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
  }
  //Update the basic details
  save() {
    const updatable = {
      diaplay_name: this.item.menus.diaplay_name,
      mobile_number: this.item.menus.mobile_number,
      designation: this.item.menus.designation
    };
    if (this.item.menus.designation === null) {
      delete updatable.designation;
    }
    this.profileservice.updateinfo(this.item.menus.user_id, updatable).subscribe(
      (res) => {
        this.snackbar.snackbars("Updated Successfully", "info-snackbar");
        this.dialogRef.close({
          data:res.metaData
        })
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.snackbars("Can not Update the changes", "error-snackbar");
        this.dialogRef.close();
      }
    );
  }
}