import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { ContextDataItem, ApplicationContext } from 'src/app/util/context/applicationContext';
import { TrainerService } from 'src/app/services/trainer';
import { IAppCardComponentEvent, AppCardComponentInput, AppCardComponentAction } from './model';

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
  @Output() summaryClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input('image') public image: any;
  @Input('ename') public ename: any;
  @Input('type') public type: any;
  @Input('description') public description: any;
  @Input('tname') public tname: any;

  @Output() cardClickEvent: EventEmitter<IAppCardComponentEvent> = new EventEmitter<IAppCardComponentEvent>();

  private _modelData
  // AppCardComponentInput = AppCardComponentInput.getDummyCard();
  @Input()
  get modelData() {
    return this._modelData;
  }
  set modelData(c) {
    this._modelData = c;
    this.cdref.markForCheck();
  }

  constructor(
    private trainerservice: TrainerService,
    private cdref: ChangeDetectorRef,
    private context: ApplicationContext
  ) { }

  ngOnInit() {
  }
  public cardClicked(order: AppCardComponentAction = AppCardComponentAction.CARD_CLICK) {
    this.cardClickEvent.next({ action: order, data: this._modelData });
    this.cdref.markForCheck();
  }
  summaryclick(data) {
    this.summaryClicked.next(data);
  }
}