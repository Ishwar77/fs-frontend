import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-advertise-delete',
  templateUrl: './advertise-delete.component.html',
  styleUrls: ['./advertise-delete.component.scss']
})
export class AdvertiseDeleteComponent implements OnInit {
  isSubmit = false;
  constructor(
    public dialogRef: MatDialogRef<AdvertiseDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {

  }

  submit() {
    this.isSubmit = true;
    this.deleteData = Object.assign({}, this.deleteData, {
      isSubmit: this.isSubmit
    });
    if (this.deleteData.isSubmit === true) {
      this.dialogRef.close(this.deleteData);
      this.isSubmit = false;
    }
    this.cdRef.markForCheck();
  }

  close() {
    this.isSubmit = false;
    this.deleteData = Object.assign({}, this.deleteData, {
      isSubmit: this.isSubmit
    });
    if (this.deleteData.isSubmit === false) {
      this.dialogRef.close(this.deleteData);
    }
    this.cdRef.markForCheck();
  }
}
