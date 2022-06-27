import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event';
import { PageManager, PageStatus, PageAction } from 'src/app/models/page';
import { ApplicationContext, ContextDataItem, ContextActionListencer, ContextEvents } from 'src/app/util/context/applicationContext';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  showMainBanner = true;
  public menus: any = [];
  selectedList: any;
  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private eventservice: EventService,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    this.listenToRoute(); //listen to route
    if (this.context.getData(ContextDataItem.TOKEN_KEY) && this.context.getData(ContextDataItem.TOKEN_VALUE)) {
      this.event(); //call the event section when the token is generated
    }
    this.listentocontext(); //listen to context
  }
  //listen to the route to change the header based on the condition
  listenToRoute() {
    this.router.events.subscribe(ele => {
      if ((ele && ele['routerEvent'] && ele['routerEvent']['url'] === '/home') ||
        (ele && ele['routerEvent'] && ele['routerEvent']['url'] === '/')) {
        this.showMainBanner = true;
        return;
      } else {
        this.showMainBanner = false;
        return;
      }
    });
  }
  //listening to the context whether the token is generated or not
  listentocontext() {
    this.context.listener.subscribe((res: ContextActionListencer) => {
      if (res.event === ContextEvents.VALUDE_CHANGED) {
        if (res.data && res.data.key && res.data.key === ContextDataItem.TOKEN_VALUE) {
          this.event();
          this.cdRef.markForCheck();
        }
      }
    });
  }
  //open the image when clicked
  openImage(item) {
    this.selectedList = item ? item : '';
    this.cdRef.markForCheck();
  }
  //to get the event details from the API
  event() {
    this.eventservice.eventdata().subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          window.scrollTo(0, 0);
          this.menus = res["metaData"];
          this.selectedList = this.menus ? this.menus[0] : 'N/A'; //storing the first obj image to the selectedlist
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.SUCCESS;
        } else {
          this.pageManager.status = PageStatus.READY;
          this.pageManager.action = PageAction.FAILED;
        }
        this.cdRef.markForCheck();
      },
      (err) => {
        this.pageManager.status = PageStatus.READY;
        this.pageManager.action = PageAction.FAILED;
        this.cdRef.markForCheck();
      }
    );
  }
  //image selection
  getUrlScheme(image) {
    if (image) {
      return "url('" + image + "')";
    }
    return "url('https://i.ibb.co/RbWnw6T/bg-4.jpg')" //if !image return placeholder image
  }
}