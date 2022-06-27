import { Component, Output, Input, ChangeDetectorRef, OnInit, EventEmitter } from '@angular/core';
import { StatsCardModel } from './stats-card.model';

@Component({
    selector: 'app-fit-stats-card',
    templateUrl: './stats-card.component.html',
    styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {

    @Output() clicked: EventEmitter<StatsCardModel> = new EventEmitter<StatsCardModel>();

    /** Input Data for component */
    public _model: StatsCardModel = {};
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
    private getDefaultModel(): StatsCardModel {
        const dataModel: StatsCardModel = {
            width: '14.5%',
            title: 'N/A',
            value: 'N/A',

        };
        return dataModel;
    }

    /** Emits Output Data */
    public cardClicked() {
        this.clicked.emit(this._model);
    }

}
