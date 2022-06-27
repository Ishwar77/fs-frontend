import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { Trainerdata } from '../../event/eventmanage/eventmanage.component';

@Component({
  selector: "app-trainer-info",
  templateUrl: "./trainer-info.html",
  styleUrls: ["./trainer-info.scss"],
})
export class TrainerInfo implements OnInit {
  menus: any = [];

  constructor(
    private dailog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public item: Trainerdata
  ) { }

  orderAction() {
    this.dailog.closeAll();
  }
  ngOnInit() { }
}