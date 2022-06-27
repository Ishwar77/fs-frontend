import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { Router } from "@angular/router";
import { PageStatus, PageAction, PageManager } from "src/app/models/page";
import { UserService } from 'src/app/services/users';
import { ApplicationContext, ContextDataItem, ContextActionListencer, ContextEvents } from 'src/app/util/context/applicationContext';
import { RatingService } from 'src/app/services/ratings';

export enum EventsListOrientation {
  /** To show cards in one row */
  INLINE = "inline",

  /** To show cards in multiple rows */
  BLOCK = "block",
}

@Component({
  selector: "app-trainer-card",
  templateUrl: "./trainer-card.component.html",
  styleUrls: ["./trainer-card.component.scss"],
})

export class TrainerCardComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  private _orientation: EventsListOrientation = EventsListOrientation.BLOCK;
  @Input()
  get orientation() {
    return this._orientation;
  }
  set orientation(o) {
    this._orientation = o || EventsListOrientation.BLOCK;
  }

  menus: any = [];

  constructor(
    private cdref: ChangeDetectorRef,
    private userService: UserService,
    private route: Router,
    private context: ApplicationContext,
    private ratingservice: RatingService
  ) { }


  ngOnInit() {
    if (this.context.getData(ContextDataItem.TOKEN_KEY) && this.context.getData(ContextDataItem.TOKEN_VALUE)) {
      this.userrole();
    }
    this.listentocontext();
  }
  //To listen to context
  listentocontext() {
    this.context.listener.subscribe((res: ContextActionListencer) => {
      if (res.event === ContextEvents.VALUDE_CHANGED) {
        if (res.data && res.data.key && res.data.key === ContextDataItem.TOKEN_VALUE) {
          this.userrole();
          this.cdref.markForCheck();
        }
      }
    });
  }
  //To get the user-role of the trainer
  userrole() {
    this.userService.userroleList().subscribe(res => {
      var uuid = res['metaData'].filter(x => x.user_role_id === 6);
      uuid = uuid[0].uuid;
      this.trainers(uuid ? uuid : '');
    })
  }
  //To get the list of trainers
  trainers(uuid) {
    this.userService.userList(uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.menus = res["metaData"];
          for (var i = 0; i < this.menus.length; i++) {
            this.menus[i].image = this.menus[i].profile_picture_url ? this.menus[i].profile_picture_url : 'https://via.placeholder.com/150';
            this.menus[i].name = this.menus[i].diaplay_name ? this.menus[i].diaplay_name : '';
          }
          this.getratings(this.menus ? this.menus : '');
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
  //get the ratings for each and every trainer
  getratings(obj) {
    this.ratingservice.getall().subscribe(res => {
      if (res && res.metaData && res.metaData.length && obj) {
        var reviewtotal: number = 0;
        for (var i = 0; i < obj.length; i++) {
          for (var j = 0; j < res.metaData.length; j++) {
            if (obj[i].user_id === res.metaData[j].trainer_id) {
              reviewtotal = reviewtotal + + res.metaData[j].ratings;
              this.menus[i].ratingvalue = Math.ceil(reviewtotal / (j + 1));
            }
          }
        }
      }
    });
  }
  //route to info
  cardsrouting(obj) {
    if (obj) {
      this.route.navigate([`coach/${obj.pageName}`]);
      this.cdref.markForCheck();
    }
  }
}