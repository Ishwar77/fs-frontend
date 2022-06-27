import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserSwitchComponent } from '../user-switch/user-switch.component';

@Component({
  selector: 'app-userlist-session',
  templateUrl: './userlist-session.component.html',
  styleUrls: ['./userlist-session.component.scss']
})
export class UserlistSessionComponent implements OnInit {
  public array: any = [];
  public data: any = [];
  public placeholder: any = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__480.png";
  public selectall: boolean = false;
  @Input() userslist: any = [];
  @Output() saveClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() sessionclicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.data = this.userslist;
  }


  //To select all users for the atendance with one click
  selectallusers() {
    this.array = [];
    if (this.selectall === false) {
      this.userslist.map(b => {
        this.array.push(b.user_id);  //selecting all the users array
        this.selectall = true;
        b.user_isOnline = true;
      })
    } else {
      this.array = []; //if deselected all removing all the obj from array
      this.userslist.map(b => {
        b.user_isOnline = false; //changing the status
      })
      this.selectall = false;
    }
    this.cdRef.markForCheck();
  }
  //add a single user to the array
  approveUser(user) {
    if (user) {
      if (user.user_isOnline === false) {
        this.array.push(user.user_id); //adding the obj to array if checked
      } else {
        const index: number = this.array.indexOf(user.user_id); //finding the index value of the selected obj
        this.array.splice(index, 1); //removing the obj from array if deselected
      }
      setTimeout(() => {
        user.user_isOnline = !user.user_isOnline;  //changing the status
        this.cdRef.markForCheck();
      }, 1000);
    }
  }
  //filter the users by name
  applyfilter(value, data) {
    var filtereddata = []; //initializing filtereddata as array
    for (var i = 0; i < data.length; i++) {
      value = value.toLowerCase(); //converting all the uppercase letters to lowercase
      var name = data[i].diaplay_name.toLowerCase();
      if (name.includes(value)) {
        filtereddata.push(data[i]); //pushing the found names obj to filtereddata
      }
    }
    this.userslist = filtereddata; //assigning filtered data to userlist
    this.cdRef.markForCheck();
  }
  //Add other users
  openDialog(event) {
    // if (event) {
    //   this.dialog.open(UserSwitchComponent, {
    //     width: '500px'
    //   });
    // }
  }
}
