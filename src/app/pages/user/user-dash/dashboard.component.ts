import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { ApplicationContext, ContextDataItem, ContextActionListencer, ContextEvents } from "src/app/util/context/applicationContext";
import { AdminDashMenu } from "./model";
import { ProfileService } from 'src/app/services/profile';
import { MatSnackBar } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class UserDashboardComponent implements OnInit {
  menus: any = [];
  activeMenu: any = {};
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  image: any;
  items: any = [];
  userID: any;
  enableEdit = false;
  enableEdit2 = false;
  enableEdit3 = false;
  userrole:any;
 // placeimage: any = "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__480.png";
  constructor(
    private _cdRef: ChangeDetectorRef,
    private route: Router,
    private profileservice: ProfileService,
    private snackbar: MatSnackBar,
    private context: ApplicationContext,
    private media: MediaMatcher
  ) { }

  ngOnInit() {
    if (!this.context || !this.context.getData(ContextDataItem.LOGGEDIN)) {
      this.route.navigate(['home']);
      return false;
    }
   // this.route.navigate([`user/main`]);
   // this.MediaMatcher();
    this.menus = AdminDashMenu.getMenuAdminItems();
    this.activeMenu = this.menus[0];
    this.route.navigate([this.activeMenu.navTo]);
    this.userID = this.context.getData(ContextDataItem.USER_ID);
    const uuid = this.context.getData(ContextDataItem.UUID);
    this.getprofile(uuid);
    this.image = this.context.getData(ContextDataItem.IMAGE_URL);
    this.userrole = this.context.getData(ContextDataItem.USER_ROLE);
    this.context.listener.subscribe((res: ContextActionListencer) => {
      if (res.event === ContextEvents.VALUDE_CHANGED) {
        this.image = this.context.getData(ContextDataItem.IMAGE_URL);
      }
    });
    this._cdRef.markForCheck();
  }

  selectMenu(menu) {
    this.activeMenu = menu;
    this._cdRef.markForCheck();
    this.route.navigate([menu.navTo]);
    return false;
  }

  getprofile(uuid) {
    this.profileservice.getprofiledetails(uuid).subscribe(
      (res) => {
        if (res["metaData"]) {
          this.items = res["metaData"];
          this._cdRef.markForCheck();
          // this.placeimage = res['metaData'] && res['metaData']['profile_picture_url'] ?
          //   res['metaData']['profile_picture_url'] : 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__480.png';
        }
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
       // this.enableEdit2 = !this.enableEdit2;
        this._cdRef.markForCheck();
        if (res && res["metaData"]) {
          this.snackbar.open("Updated Successfully", "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: ["sucess-snackbar"],
          });
          this.menus.profile_picture_url = res.metaData.profile_picture_url;
          this.context.setData(ContextDataItem.IMAGE_URL,res.metaData.profile_picture_url);
        }
        // this.menus.profile_picture_url = this.getImageUrl(res.metaData.profile_picture_url);
        this._cdRef.markForCheck();
      },
      (err) => {
        this.snackbar.open("Cannot Update", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
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


  // MediaMatcher() {
  //   this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  //   this._mobileQueryListener = () => this._cdRef.detectChanges();
  //   this.mobileQuery.addListener(this._mobileQueryListener);
  // }
}
