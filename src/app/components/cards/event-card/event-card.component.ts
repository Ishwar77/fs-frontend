import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { EventService } from "src/app/services/event";
import { Router } from "@angular/router";
import { PageStatus, PageAction, PageManager } from "src/app/models/page";
import { ApplicationContext, ContextDataItem, ContextActionListencer, ContextEvents } from 'src/app/util/context/applicationContext';
import { ReviewService } from 'src/app/services/review';

export enum EventsListOrientation {
  /** To show cards in one row */
  INLINE = "inline",

  /** To show cards in multiple rows */
  BLOCK = "block",
}

@Component({
  selector: "app-event-card",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.scss"],
})
export class EventCardComponent implements OnInit {
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
  loadingvalue: boolean = true;

  constructor(
    private cdref: ChangeDetectorRef,
    private eventservice: EventService,
    private route: Router,
    private context: ApplicationContext,
    private reviewservice: ReviewService
  ) { }

  ngOnInit() {
    if (this.context.getData(ContextDataItem.TOKEN_KEY) && this.context.getData(ContextDataItem.TOKEN_VALUE)) {
      this.event();
    }
    this.listentocontext();
  }
  //listen to the context
  listentocontext() {
    this.context.listener.subscribe((res: ContextActionListencer) => {
      if (res.event === ContextEvents.VALUDE_CHANGED) { //if any of the values changed
        if (res.data && res.data.key && res.data.key === ContextDataItem.TOKEN_VALUE) {
          this.event();
          this.cdref.markForCheck();
        }
      }
    });
  }
  //to get the event details
  event() {
    this.eventservice.eventdata().subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.menus = res["metaData"];
          for (var i = 0; i < this.menus.length; i++) {
            this.menus[i].image = this.menus[i].cover_image ? this.menus[i].cover_image : 'https://via.placeholder.com/150';
            this.menus[i].name = this.menus[i].event_name ? this.menus[i].event_name : '';
          }
          this.getallreviews(this.menus ? this.menus : '');
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
  //get the reviews
  getallreviews(obj) {
    this.reviewservice.reviewAll().subscribe(res => {
      if (res && res.metaData && obj) {
        var reviewtotal: number = 0;
        for (var i = 0; i < obj.length; i++) {
          for (var j = 0; j < res.metaData.length; j++) {
            if (obj[i].event_id === res.metaData[j].event_id) {
              reviewtotal = reviewtotal + + res.metaData[j].ratings;
              this.menus[i].ratingvalue = Math.ceil(reviewtotal / (j + 1));
            }
          }
        }
      }
    }, err => {
    });
  }
  //route to particular event info page
  cardsrouting(obj) {
    if (obj) {
      this.route.navigate([`event/${obj.uuid}`]);
      this.cdref.markForCheck();
    }
  }
}