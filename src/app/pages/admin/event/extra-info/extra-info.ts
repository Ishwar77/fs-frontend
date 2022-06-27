import {
  Component,
  OnInit,
  Inject,
} from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { extradata } from '../eventmanage/eventmanage.component';

@Component({
  selector: "app-extra-info",
  templateUrl: "./extra-info.html",
  styleUrls: ["./extra-info.scss"],
})
export class ExtraInfo implements OnInit {
  menus: any = [];

  constructor(
    private dailog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public item: extradata
  ) { }

  ngOnInit() { }

  orderAction() {
    this.dailog.closeAll();
  }
}