import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Inject,
} from "@angular/core";
import {
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { BatchDataManage } from '../batch-manage/batch-manage.component';
import { BatchService } from 'src/app/services/batch';
import { BatchModel } from 'src/app/models/batchmodel';
import { ApplicationContext } from 'src/app/util/context/applicationContext';
import { FormControl } from '@angular/forms';

@Component({
  selector: "app-batch-add",
  templateUrl: "./batch-add.component.html",
  styleUrls: ["./batch-add.component.scss"],
})
export class BatchAddComponent implements OnInit {
  menus: any = [];
  id: any;
  limitvalue: any = 0;
  limittext: any;
  showview: boolean = false;
  public selectedFile: File = null;
  imgURL: any;
  public _data: BatchModel = {};
  listofDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  isWeek = false;

  days = new FormControl();
  daysList: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
    public dialogRef: MatDialogRef<BatchAddComponent>,
    private snackbar: MatSnackBar,
    private batchservice: BatchService,
    private context: ApplicationContext,
    @Inject(MAT_DIALOG_DATA) public item: BatchDataManage
  ) { }

  ngOnInit() {
    this.getfrequencydata();
  }

  loadBatchsByEvents(event) {
    this.batchservice.getbatch(event).subscribe(ele => {
      if (ele) {
      }
    });
  }

  getfrequencydata() {
    this.batchservice.getfrequency().subscribe((res) => {
      this.menus = res["metaData"];
      if (this.menus && this.menus.length !== 0) {
        this.showview = true;
      }
      this.cdref.markForCheck();
    }, err => {
      this.dialogRef.close();
    });
  }

  addsubscription() {
    const updatable = {
      event_id: this.item.eventID,
      start_time: this.data.starttime + "",
      end_time: this.data.endtime + "",
      has_limit: this.limitvalue + "",
      batch_size: this.data.batchsize + "",
      frequency: +this.id,
      available_seats: this.data.batchsize + "",
      frequency_config: JSON.stringify(this.days.value),
      subscription_id: this.item.subsID
    };

    if (this.limitvalue === 0) {
      delete updatable.batch_size;
      delete updatable.available_seats;
    }
    this.batchservice.addbatch(updatable).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackbar.open("Batch has been Added Successfully", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["sucess-snackbar"],
        });
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.open("Please provide proper details", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
      }
    );
  }

  reset() {
    BatchModel.clearall(this.data);
    this.cdref.markForCheck();
  }

  frequencylist(data) {
    if (!data) {
      return;
    }
    this.id = data.frequency_id;
    this.cdref.markForCheck();
  }

  slide(data) {
    if (data.checked === true) {
      this.limitvalue = 1;
      this.limittext = 'Limit';

    } else {
      this.limitvalue = 0;
      this.limittext = 'No Limit';
    }
  }

  onlyNumbers(event) {
    this.context.onlyPositiveNumbers(event);
  }
}
