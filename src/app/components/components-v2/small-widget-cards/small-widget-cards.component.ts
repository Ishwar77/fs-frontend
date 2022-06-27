import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-small-widget-card',
    templateUrl: './small-widget-card.component.html',
    styleUrls: ['./small-widget-card.component.scss']
})

export class SmallCardWidgetComponent implements AfterViewInit {

    @Output() emitClickedData: EventEmitter<any> = new EventEmitter<any>();
    @Output() batchinfoclicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() meetinginfoclicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() attendanceclicked: EventEmitter<any> = new EventEmitter<any>();
    menus: any = [];
    _model: any = {};
    @Input()
    get model() {
        return this._model;
    }
    set model(k) {
        this._model = k;
        if (!this._model['days_short']) {
            this._model['days_short'] = '';
        }
        this.cdRef.markForCheck();
    }

    constructor(
        private cdRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit() {
        if (this.model.frequency === 3) {
            setTimeout(() => {
                this.convertMenus(this.model.frequency_config);
            }, 10);
            this.cdRef.markForCheck();
        }
    }

    clicksData(data) {
        this.emitClickedData.next(data);
    }

    private convertMenus(jsonString) {
        if (!jsonString) { return []; }
        let days = [];
        try {
            let obj = [];
            let t = JSON.parse(jsonString);
            if (typeof t === 'string') {
                obj = JSON.parse(t);
            }

            if (obj && obj.length) {
                obj.forEach(day => {
                    days.push(day.substr(0, 2));
                });
            }
        }
        catch (e) {
        }
        this.model['days_short'] = days.join(", ");
    }
}
