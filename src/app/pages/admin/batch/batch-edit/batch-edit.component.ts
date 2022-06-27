import { Component, OnInit, ChangeDetectorRef, Inject } from "@angular/core";
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { BatchService } from 'src/app/services/batch';
import { BatchDataManage } from '../batch-manage/batch-manage.component';
import { ApplicationContext } from 'src/app/util/context/applicationContext';

@Component({
  selector: "app-batch-edit",
  templateUrl: "./batch-edit.component.html",
  styleUrls: ["./batch-edit.component.scss"],
})
export class BatchEditComponent implements OnInit {
  menus: any = [];
  id: any;
  showview: boolean = false;
  freqname: any = [];
  public selectedFile: File = null;
  imgURL: any;

  constructor(
    private cdref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<BatchEditComponent>,
    private snackbar: MatSnackBar,
    private batchservice: BatchService,
    @Inject(MAT_DIALOG_DATA) public item: BatchDataManage,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
    this.getfrequencydata();
  }

  getfrequencydata() {
    this.batchservice.getfrequency().subscribe((res) => {
      this.menus = res["metaData"];
      if (this.menus && this.menus.length !== 0) {
        this.showview = true;
        this.cdref.markForCheck()
      }
      this.freqname = this.menus.filter(x => x.frequency_id === this.item.frequency);
      this.cdref.markForCheck();
    }, err => {
      this.dialogRef.close();
    });
  }

  editsubscription() {
    if (!this.id) {
      this.id = this.item.frequency
    }
    const updatable = {
      start_time: this.item.starttime + "",
      end_time: this.item.endtime + "",
      batch_size: this.item.size + "",
      frequency: this.id
    };
    if(updatable.batch_size === '0') {
      delete updatable.batch_size;
    }
    this.batchservice.editbatch(this.item.batches_id, updatable).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackbar.open("Updated Successfully", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["sucess-snackbar"],
        });
        this.cdref.markForCheck();
      },
      (err) => {
        this.snackbar.open("Cannot Update, Error", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: ["error-snackbar"],
        });
      }
    );
  }

  frequencylist(data) {
    this.id = data;
  }

  onlyNumbers(event) {
    this.context.onlyPositiveNumbers(event);
  }
}