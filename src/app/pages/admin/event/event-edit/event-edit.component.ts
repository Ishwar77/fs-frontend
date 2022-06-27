import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { EventDataManage } from "../eventmanage/eventmanage.component";
import { formatDate } from "@angular/common";
import { EventService } from "src/app/services/event";
import { UserService } from 'src/app/services/users';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: "app-event-edit",
  templateUrl: "./event-edit.component.html",
  styleUrls: ["./event-edit.component.scss"],
})
export class EventEditComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [

        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        // 'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName',
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ],

  };


  public selectedFile: File = null;
  imgURL: any;
  image: any;
  trainers: any = [];
  id: any;
  trainername: any = [];
  trainerid: any;
  eventname: any = [];
  menus: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public item: EventDataManage,
    private cdref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<EventEditComponent>,
    private eventservice: EventService,
    private userservice: UserService
  ) { }

  ngOnInit() {
    this.geteventsmaster();
    this.gettrainers();
    this.item.startdate = formatDate(this.item.startdate, "dd/MM/yyyy", "en");
    this.item.enddate = formatDate(this.item.enddate, "dd/MM/yyyy", "en");
    this.item.starttime = formatDate(this.item.starttime, "hh:mm", "en");
    this.item.endtime = formatDate(this.item.endtime, "hh:mm", "en");
    this.eventname = this.menus.filter(
      (x) => x.event_master_id === this.item.type_id
    )[0];
  }

  onFileChanged(event) {
    this.selectedFile = <File>event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  update() {
    var imageupload: any;
    if (this.selectedFile && this.selectedFile.name) {
      imageupload = this.selectedFile;
    } else {
      imageupload = 1;
    }

    if (!this.id) {
      this.id = this.item.type_id;
    }
    if (!this.trainerid) {
      this.trainerid = this.item.instructor_id
    }
    this.dialogRef.close({
      id: this.item.id,
      name: this.item.name,
      price: this.item.price,
      description: this.item.description,
      startdate: this.item.startdate,
      enddate: this.item.enddate,
      starttime: this.item.starttime,
      endtime: this.item.endtime,
      period: this.item.period,
      type_id: this.id,
      instructor_id: this.trainerid,
    //  meeting_links: this.item.meeting_links,
      imageupload: imageupload
    });
  }
  geteventsmaster() {
    this.eventservice.eventmaster().subscribe((res) => {
      this.menus = res["metaData"];
      this.eventname = this.menus.filter(
        (x) => x.event_master_id === this.item.type_id
      );
      this.eventname = this.eventname[0].event_master_name;
      this.cdref.markForCheck();
    });
  }
  menuptions(data) {
    this.id = data;
  }
  gettrainers() {
    this.userservice.userList(6).subscribe((res) => {
      this.trainers = res['metaData'];
      this.trainername = this.trainers.filter(x => x.user_id === this.item.instructor_id);
      this.trainername = this.trainername[0].diaplay_name;
      this.cdref.markForCheck();
    });
    this.trainername = this.trainers.filter(x => x.user_id === this.item.instructor_id);
    this.cdref.markForCheck();
  }
  trainerlist(data) {
    this.trainerid = data;
  }
}