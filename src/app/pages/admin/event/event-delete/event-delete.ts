import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { EventDataManage } from '../eventmanage/eventmanage.component';

@Component({
  selector: "app-event-delete",
  templateUrl: "./event-delete.html",
  styleUrls: ["./event-delete.scss"]
})
export class EventDelete implements OnInit {

  menus: any = [];

  constructor(
    private dailog: MatDialog,
    public dialogRef: MatDialogRef<EventDelete>,
    @Inject(MAT_DIALOG_DATA) public item: EventDataManage
  ) { }

  orderAction() {
    this.dailog.closeAll();
  }
  ngOnInit() { }

  delete() {
    this.dialogRef.close({
      id: this.item.delid
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
