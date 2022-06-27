import {
  Component,
  OnInit,
  Inject,
} from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { dialogdata } from "../../payment/paymentmanage/paymentmanage.component";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.html",
  styleUrls: ["./user-info.scss"],
})
export class UserInfo implements OnInit {
  menus: any = [];

  constructor(
    private dailog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public item: dialogdata
  ) { }

  orderAction() {
    this.dailog.closeAll();
  }
  ngOnInit() { }
}