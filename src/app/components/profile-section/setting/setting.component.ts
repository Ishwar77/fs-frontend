import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  showview: boolean = false;
  constructor(

  ) { }

  ngOnInit() {
  }
}
