import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../Authentication/login/login.component';

@Component({
  selector: 'app-invite-promo',
  templateUrl: './invite-promo.component.html',
  styleUrls: ['./invite-promo.component.scss']
})
export class InvitePromoComponent implements OnInit {
  public text: any = "Refer your friends on Console and earn reward points. You can copy the affiliate link and share it on social media";
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  //open the login dialog
  tosharetheprofile() {
    this.dialog.open(LoginComponent);
  }
}