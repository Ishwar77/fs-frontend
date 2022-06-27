import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-charts-graph',
    templateUrl: './charts-component.html',
    styleUrls: ['./charts-component.scss']
})

export class ChartsComponent implements OnInit, AfterViewInit {
    @ViewChild('chart', { static: false }) chart: ElementRef;

    /** @var any, Chart instance */
    private chartInstance: any;

    constructor(private cdRef: ChangeDetectorRef) { }
    _model: any = {};
    @Input()
    get model() {
        return this._model;
    }
    set model(data: any) {
        this._model = data || {};
        if (!this._model.size) {
            this._model.size = 'S';
        }
        if (!this._model.config || !!this._model.config.showLegend) {
            this._model.config = { showLegend: false };
            this.cdRef.markForCheck();
        }
    }

    ngOnInit() { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.showGraph();
        }, 300);
    }

    private showGraph() {
        try {
            const context = (this.chart.nativeElement as HTMLCanvasElement).getContext('2d');
            this.chartInstance = new Chart(context, this.model.config);
            this.cdRef.markForCheck();
            return;
        } catch (e) {
            return;
        }
    }
}