import { SliderPanelModel, SliderViewMode } from './model';
import { Component, Input, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/services/event';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-subs-slider-layout-create',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponentLayouts implements OnInit {
    favoriteSeason: string='Public';
    seasons: string[] = ['Public', 'Private'];
    viewMode: number;
    _model: SliderPanelModel = new SliderPanelModel();
    public selectedFile: File = null;
    imgURL: any;
    menus: any;
    @Output() closeslider: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    get model() {
        return this._model;
    }
    set model(m) {
        this._model = m;
        this._cdRef.markForCheck();
    }

    constructor(
        private _cdRef: ChangeDetectorRef,
        private eventservice: EventService
    ) { }

    ngOnInit() {
        this.geteventsmaster();
        this.viewMode = this.model ? this.model['viewMode'] : null;
    }

    saveAction() {
        if (!this._model) {
            return;
        }
        var type: any = 0;
        if (this.favoriteSeason === 'Public') {
            type = 0;
        } else if (this.favoriteSeason === 'Private') {
            type = 1;
        }
        this._model.type = type;
        this._model.listener.next({ event: this._model.viewMode, data: this._model });
    }

    deleteevent() {
        if (!this._model) {
            return;
        }
        this._model.listener.next({ event: 4, data: this._model });
    }

    public getPanelTitle(header = true) {
        if (!this._model) {
            return 'Panel';
        }

        switch (this._model.viewMode) {
            case SliderViewMode.CREATE: return header ? 'Add Coupon' : 'add';
            case SliderViewMode.EDIT: return header ? 'Edit Coupon' : 'add';
            case SliderViewMode.INFO: return header ? 'Our Coupons' : 'edit';
        }
    }

    onFileChanged(event) {
        this.selectedFile = <File>event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event2) => {
            this.imgURL = reader.result;
        };
    }

    geteventsmaster() {
        this.eventservice.eventmaster().subscribe((res) => {
            this.menus = res["metaData"];
            this._cdRef.markForCheck();
        });
    }
    updatedate(event) {
        this.model['expiry'] = new Date(event);
    }
    closesilder() {
        this.closeslider.next();
    }
}