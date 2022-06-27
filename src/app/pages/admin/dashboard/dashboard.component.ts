import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { ApplicationContext, ContextDataItem, ContextEvents, ContextActionListencer } from "src/app/util/context/applicationContext";
import { AdminDashMenu } from "./model";
import { ProfileService } from 'src/app/services/profile';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  menus: any = [];
  items: any = [];
  activeMenu: any = {};
  image: any;
  userID: any;
  enableEdit = false;
  enableEdit2 = false;
  enableEdit3 = false;
  userrole:any;
  placeimage: any = "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__480.png";

  constructor(
    private _cdRef: ChangeDetectorRef,
    private route: Router,
    private profileservice: ProfileService,
    private snackbar: MatSnackBar,
    private context: ApplicationContext
  ) { }

  ngOnInit() {

    if (!this.context || !this.context.getData(ContextDataItem.LOGGEDIN)) {
      this.route.navigate(['home']);
      return false;
    }
    this.userID = this.context.getData(ContextDataItem.USER_ID);
    this.getprofile();
    this.menus = AdminDashMenu.getMenuAdminItems();
    this.image = this.context.getData(ContextDataItem.IMAGE_URL);
    this.context.listener.subscribe((res: ContextActionListencer) => {
      this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
      if (res.event === ContextEvents.VALUDE_CHANGED) {
        this.image = this.context.getData(ContextDataItem.IMAGE_URL);
      }
    });
    this.activeMenu = this.menus[0];
    this.route.navigate([this.activeMenu.navTo]);
    this._cdRef.markForCheck();
  }

  selectMenu(menu) {
    this.activeMenu = menu;
    this._cdRef.markForCheck();
    this.route.navigate([menu.navTo]);
    return false;
  }

  getprofile() {
    const uuid = this.context.getData(ContextDataItem.UUID);
    this.profileservice.getprofiledetails(uuid).subscribe(
      (res) => {
        if (res["metaData"]) {
          this.items = res["metaData"];
          this.placeimage = res['metaData'] && res['metaData']['profile_picture_url'] ?
            res['metaData']['profile_picture_url'] : 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__480.png';
        }
        this._cdRef.markForCheck();
      },
      (err) => {
      }
    );
  }


  enableEditIndex2 = null;
  enableEditMethod2(f, j) {
    this.enableEdit2 = f;
    this.enableEditIndex2 = j;
    this._cdRef.markForCheck();
  }

  selectedFile = null;
  enableEditEmage = false;

  onFileSelecte(event) {
    this.selectedFile = event.target.files[0];

    const fd = new FormData();
    fd.append("picture", this.selectedFile, this.selectedFile.name);

    fd.set("type", "USER");
    fd.set("key", this.userID);
    fd.set("picture", this.selectedFile);

    this.profileservice.UserProfilePictureUpload(fd).subscribe(
      (res) => {
        this._cdRef.markForCheck();
        if (res && res["metaData"]) {
          this.snackbar.open("Updated Successfully", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["sucess-snackbar"],
          });
          this.menus.profile_picture_url = res.metaData.profile_picture_url;
          this.placeimage = res.metaData.profile_picture_url;
          this.getprofile();
          this.context.setData(ContextDataItem.IMAGE_URL,res.metaData.profile_picture_url);
        }
        this._cdRef.markForCheck();
      },
      (err) => {
        this.snackbar.open("Updated Successfully", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["sucess-snackbar"],
        });
        this._cdRef.markForCheck();
      }
    );
  }

  getImageUrl(picUrl) {
    if (picUrl) {
      return "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png";
    }
  }
}
