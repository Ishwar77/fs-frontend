import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { CoupanCardComponentInput, ICoupanCardComponentEvent, CoupanCardComponentAction } from './model';

@Component({
  selector: 'app-coupan-card',
  templateUrl: './coupan-card.component.html',
  styleUrls: ['./coupan-card.component.scss']
})
export class CoupanCardComponent {
  @Output() cardClicked: EventEmitter<any> = new EventEmitter<any>();

  @Input() public menus: any;

  constructor(
    private cdref: ChangeDetectorRef,
  ) { }
  cardclicked(data) {
    this.cardClicked.next(data);
  }
}