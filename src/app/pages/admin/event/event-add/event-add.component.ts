import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from "@angular/core";
import { EventModel } from "src/app/models/event";
import { EventService } from "src/app/services/event";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { UserService } from 'src/app/services/users';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProfileService } from 'src/app/services/profile';
import { ApplicationContext } from 'src/app/util/context/applicationContext';

@Component({
  selector: "app-event-add",
  templateUrl: "./event-add.component.html",
  styleUrls: ["./event-add.component.scss"],
})
export class EventAddComponent implements OnInit {

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


  menus: any = [];
  trainers: any = [];
  apiDateFrm: any;
  apiDateTo: any;
  id: any;
  trainerid: any;
  public selectedFile: File = null;
  imgURL: any;
  public _data: EventModel = {};
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
    private eventservice: EventService,
    public dialogRef: MatDialogRef<EventAddComponent>,
    private snackbar: MatSnackBar,
    private userservice: UserService,
    private profileservice: ProfileService,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    this.geteventsmaster();
    this.gettrainers();
  }

  addevent() {
    const frmdate = new Date(this.data.startdate);
    const todate = new Date(this.data.enddate);
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
      event_master_id: this.id,
      event_name: this.data.name,
      description: this.data.description,
      price: this.data.price,
      trial_period: this.data.period,
      instructor_id: this.trainerid,
     // meeting_links: this.data.link,
      start_date: this.apiDateFrm,
      end_date: this.apiDateTo,
      //  start_time: this.data.starttime,
      // end_time: this.data.endtime
    };
    if (this.selectedFile && this.selectedFile.name) {
      this.eventservice.addevent(updatable).subscribe(
        (res) => {
          const fd = new FormData();
          fd.append("picture", this.selectedFile, this.selectedFile.name);
          fd.set("type", "EVENT");
          fd.set("key", res['metaData'].event_id);
          fd.set("picture", this.selectedFile);
          this.profileservice.EventCoverImageUpload(fd).subscribe((result) => {
            if (result && result.metaData) {
              this.dialogRef.close({
                message: "success",
              });
            }
          });
          this.cdref.markForCheck();
        },
        (err) => {
          this.snackbar.open("please provide the proper details", "", {
            duration: 4000,
          });
        }
      );
    } else {
      this.snackbar.open("please upload the image", "", {
        duration: 4000,
      });
    }
  }

  geteventsmaster() {
    this.eventservice.eventmaster().subscribe((res) => {
      this.menus = res["metaData"];
      this.cdref.markForCheck();
    });
  }

  menuptions(data) {
    this.id = data;
  }
  gettrainers() {
    this.userservice.userList(6).subscribe((res) => {
      this.trainers = res['metaData'];
      this.cdref.markForCheck();
    })
  }


  trainerlist(data) {
    this.trainerid = data;
  }

  onFileChanged(event) {
    this.selectedFile = <File>event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  reset() {
    EventModel.clearall(this.data);
    this.cdref.markForCheck();
  }

  onlyNumbers(event) {
    this.context.onlyPositiveNumbers(event);
  }
}
