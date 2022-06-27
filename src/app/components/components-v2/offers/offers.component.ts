import { Component, OnInit,EventEmitter, ChangeDetectorRef, Output, Input } from '@angular/core';
import { OfferCardModel } from './offer-card.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  @Output() clicked: EventEmitter<OfferCardModel> = new EventEmitter<OfferCardModel>();

  /** Input Data for component */
  public _model: OfferCardModel = {};
  @Input()
  get model() {
      return this._model;
  }
  set model(model: any) {
      this._model = model || this.getDefaultModel();
      this.cdRef.markForCheck();
  }

  constructor(
      private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  /** Default Model Data Returns */
  private getDefaultModel(): OfferCardModel {
      const dataModel: OfferCardModel = {
          width: '14.5%',
          title: 'N/A',
          value: 'N/A',
          due: 'N/A'
      };
      return dataModel;
  }

  /** Emits Output Data */
  public cardClicked() {
      this.clicked.emit(this._model);
  }
}
