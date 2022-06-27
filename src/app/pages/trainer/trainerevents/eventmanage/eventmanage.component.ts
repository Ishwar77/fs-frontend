import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatSnackBar,
  MatPaginator,
  MatSort,
  MatDrawer,
} from "@angular/material";
import { EventService } from "src/app/services/event";
import { Router } from "@angular/router";
import { PageManager, PageStatus, PageAction } from "src/app/models/page";
import {
  ApplicationContext,
  ContextDataItem,
} from "src/app/util/context/applicationContext";
import { TrainerService } from 'src/app/services/trainer';
import { ProfileService } from 'src/app/services/profile';
import { SliderPanelModel, SliderViewMode, SliderPanelResponse } from './slider-component/model';
import { SnackbarService } from 'src/app/services/snackbar';
@Component({
  selector: "app-eventmanage",
  templateUrl: "./eventmanage.component.html",
  styleUrls: ["./eventmanage.component.scss"],
})
export class EventmanageComponent implements OnInit {
  pageManager: PageManager = new PageManager();
  eventList: any = [];
  inactivemenus: any = [];
  toggle: boolean = true;
  apiDateFrm: any;
  apiDateTo: any;
  dialoguedata: any;
  inactivedatasource;
  loadingvalue: boolean = true;
  deletedata: any;
  sliderInput: SliderPanelModel;
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  selectedCard: any;
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private eventService: EventService,
    private trainerservice: TrainerService,
    private cdref: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private route: Router,
    private context: ApplicationContext,
    private profileservice: ProfileService
  ) { }

  ngOnInit() {
    this.loadeventLists();
  }

  loadeventLists() {
    const trainerId = this.context.getData(ContextDataItem.USER_ID);
    const uuid = this.context.getData(ContextDataItem.UUID);
    this.trainerservice.activeevents(uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.eventList = res["metaData"];
          // this.inactiveeventList(uuid);
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

  inactiveeventList(uuid) {
    this.trainerservice.inactiveevents(uuid).subscribe(
      (res) => {
        if (res["metaData"] && res["metaData"].length) {
          this.inactivemenus = res["metaData"];
          this.eventList = [...this.eventList, ...this.inactivemenus];
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eventinfo(data) {
    this.route.navigate([`event/${data.event_id}`]);
  }

  deleteevent(data) {
    if (!data) {
      return;
    }
    this.eventService.deleteevent(data.id).subscribe(
      (res) => {
        setTimeout(() => {
          this.loadeventLists();
        }, 2000);
        this.snackbar.snackbars("Event Deleted Successfully", "info-snackbar");
        this.closeSlider();
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.snackbars("Cannot Delete the Event", "error-snackbar");
      }
    );
  }
  /**
   * Card Level Implementation
   */
  sliderCloseListener() {
    if (this.selectedCard) {
      //  this.selectedCard.isActive = false;
      this.selectedCard = null;
      this.cdref.markForCheck();
    }
  }

  getClickedCard(card: any) {
    if (!card) {
      return false;
    }
    this.selectedCard = card.data;
    // this.selectedCard.isActive = true;
    this.cdref.markForCheck();
    this.selectedCard['name'] = card.data.title;
    const sliderData = new SliderPanelModel();
    sliderData.id = card.data.event_id;
    sliderData.name = card.data.event_name;
    sliderData.type = card.data.EventMaster.event_master_name;
    sliderData.description = card.data.description;
    sliderData.image = card.data.cover_image;
    sliderData.startdate = card.data.start_date;
    sliderData.enddate = card.data.end_date;
    // sliderData.link = card.data.meeting_links;
    sliderData.metaData = this.selectedCard;
    sliderData.viewMode = SliderViewMode.INFO;
    this.openSlider(sliderData);
  }

  openCreateSlider() {
    const sliderData = new SliderPanelModel();
    sliderData.name = '';
    sliderData.description = '';
    sliderData.type = '';
    sliderData.image = '';
    sliderData.price = '';
    sliderData.period = '';
    sliderData.startdate = '';
    sliderData.enddate = '';
    sliderData.starttime = '';
    sliderData.endtime = '';
    //  sliderData.link = '';
    sliderData.viewMode = SliderViewMode.CREATE;
    this.openSlider(sliderData);
  }

  save(data) {
    this.addevent(data);
  }

  update(data) {
    this.saveevent(data);
  }

  delete(data) {
    this.deleteevent(data);
  }

  private openSlider(data: SliderPanelModel) {
    if (!data) {
      return false;
    }
    this.sliderInput = data;
    this.cdref.markForCheck();
    this.drawer.open();

    this.sliderInput.listener.subscribe((res: SliderPanelResponse) => {

      // Current view mode is captured
      // if info, make edit; if edit make save, if save back to info
      switch (res.event) {
        case SliderViewMode.INFO:
          this.sliderInput.viewMode = SliderViewMode.EDIT;
          this.cdref.markForCheck();
          break;
        case SliderViewMode.CREATE:
          this.save(res.data);
          this.cdref.markForCheck();
          break;
        case SliderViewMode.EDIT:
          this.sliderInput.viewMode = SliderViewMode.INFO;
          this.update(res.data);
          this.cdref.markForCheck();
          break;
        case SliderViewMode.DELETE:
          //   this.sliderInput.viewMode = SliderViewMode.INFO;
          this.delete(res.data);
          this.cdref.markForCheck();
          break;
      }
    });
  }

  closeSlider() {
    this.drawer.close();
  }

  saveevent(obj) {
    const frmdate = new Date(obj.startdate);
    const todate = new Date(obj.enddate);
    if (frmdate.getDate() < 10) {
      this.apiDateFrm = `${frmdate.getFullYear()}-${frmdate.getMonth() + 1}-${0}${frmdate.getDate()}`;
    }
    if (todate.getDate() < 10) {
      this.apiDateTo = `${todate.getFullYear()}-${todate.getMonth() + 1}-${0}${todate.getDate()}`;
    }
    if (frmdate.getDate() > 9) {
      this.apiDateFrm = `${frmdate.getFullYear()}-${frmdate.getMonth() + 1}-${frmdate.getDate()}`;
    }
    if (todate.getDate() > 9) {
      this.apiDateTo = `${todate.getFullYear()}-${todate.getMonth() + 1}-${todate.getDate()}`;
    }

    const updatable = {
      event_master_id: obj.type.event_master_id,
      event_name: obj.name,
      description: obj.description,
      //  meeting_links: obj.link,
      start_date: this.apiDateFrm,
      end_date: this.apiDateTo,
      // start_time: this.data.starttime,
      // end_time: this.data.endtime
    };
    if (!obj.type.event_master_id) {
      delete updatable.event_master_id;
    }
    this.eventService.updateevent(obj.id, updatable).subscribe(
      (res) => {
        this.snackbar.snackbars("Updated Successfully", "info-snackbar");
        this.closeSlider();
        this.loadeventLists();
        this.cdref.markForCheck();
      }
    );
    if (obj.image && obj.image.name) {
      const fd = new FormData();
      fd.append("picture", obj.image, obj.image.name);
      fd.set("type", "EVENT");
      fd.set("key", obj.id);
      fd.set("picture", obj.image);
      this.profileservice.EventCoverImageUpload(fd).subscribe((result) => {
        if (result && result.metaData) {
          this.snackbar.snackbars("Image Updated Successfully", "info-snackbar");
          this.loadeventLists();
          this.closeSlider();
        }
      });
    }
  }

  addevent(obj) {
    const userId = this.context.getData(ContextDataItem.USER_ID);
    const frmdate = new Date(obj.startdate);
    const todate = new Date(obj.enddate);
    if (frmdate.getDate() < 10) {
      this.apiDateFrm = `${frmdate.getFullYear()}-${frmdate.getMonth() + 1}-${0}${frmdate.getDate()}`;
    }
    if (todate.getDate() < 10) {
      this.apiDateTo = `${todate.getFullYear()}-${todate.getMonth() + 1}-${0}${todate.getDate()}`;
    }
    if (frmdate.getDate() > 9) {
      this.apiDateFrm = `${frmdate.getFullYear()}-${frmdate.getMonth() + 1}-${frmdate.getDate()}`;
    }
    if (todate.getDate() > 9) {
      this.apiDateTo = `${todate.getFullYear()}-${todate.getMonth() + 1}-${todate.getDate()}`;
    }

    const updatable = {
      event_master_id: obj.type.event_master_id,
      event_name: obj.name,
      description: obj.description,
      price: 0,
      trial_period: 0,
      isActive: 0,
      instructor_id: userId,
      //  meeting_links: obj.link,
      start_date: this.apiDateFrm,
      end_date: this.apiDateTo,
      // start_time: this.data.starttime,
      // end_time: this.data.endtime
    };
    if (obj.image && obj.image.name) {
      this.eventService.addevent(updatable).subscribe(
        (res) => {
          const fd = new FormData();
          fd.append("picture", obj.image, obj.image.name);
          fd.set("type", "EVENT");
          fd.set("key", res['metaData'].event_id);
          fd.set("picture", obj.image);
          this.profileservice.EventCoverImageUpload(fd).subscribe((result) => {
            if (result && result.metaData) {
              this.closeSlider();
              this.snackbar.snackbars("Event Added Successfully, Wait for the Admin to Approve the Event", "info-snackbar");
              this.loadeventLists();
            }
          });
          this.cdref.markForCheck();
        },
        (err) => {
          this.snackbar.snackbars("Please provide the proper details", "error-snackbar");
        }
      );
    } else {
      this.snackbar.snackbars("Please Upload the Image", "error-snackbar");
    }
  }

  movetosummary(obj, menuObj) {
    if (obj) {
      this.context.setData(ContextDataItem.EventUUID, obj.uuid);
      this.context.setData(ContextDataItem.EVENT_ID, obj.event_id);
      this.context.setData(ContextDataItem.EVENT_NAME, obj.event_name);
      this.route.navigate([`summary/${obj.uuid}/subscription`]);
    }
  }

  closingslider() {
    this.closeSlider();
  }
}
