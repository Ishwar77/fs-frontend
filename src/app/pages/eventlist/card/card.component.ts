import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { IAppCardComponentEvent, AppCardComponentAction } from './model';

@Component({
  selector: 'app-cards',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardssComponent implements OnInit {
  inactivemenus: any = [];
  toggle: boolean = true;
  dialoguedata: any;
  activemenu: any;
  inactivedatasource;
  loadingvalue: boolean = true;

  @Output() cardClickEvent: EventEmitter<IAppCardComponentEvent> = new EventEmitter<IAppCardComponentEvent>();
  @Output() batchTransfer: EventEmitter<any> = new EventEmitter<any>();
  @Output() getbatches: EventEmitter<any> = new EventEmitter<any>();
  @Input() public batchdata: any = [];
  private _modelData
  @Input()
  get modelData() {
    return this._modelData;
  }
  set modelData(c) {
    this._modelData = c;
    this.cdref.markForCheck();
  }

  constructor(
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  public cardClicked(order: AppCardComponentAction = AppCardComponentAction.CARD_CLICK) {
    this.cardClickEvent.next({ action: order, data: this._modelData });
    this.cdref.markForCheck();
  }
  //batchtransfer data
  batchtransferss(menu, modeldata) {
    const updatable = {
      menu: menu ? menu : '',
      modeldata: modeldata ? modeldata : ''
    }
    this.batchTransfer.next(updatable);
  }
}