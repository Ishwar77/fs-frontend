import { SliderPanelModel, SliderViewMode } from './model';
import { Component, Input, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/services/event';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl } from '@angular/forms';
import { SubscriptionService } from 'src/app/services/subscription';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from 'src/app/services/batch';

@Component({
    selector: 'app-subs-slider-layout-create',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponentLayouts implements OnInit {

    id: any;
    uuid: any;
    limitvalue: any = 0;
    limittext: any;
    showview: boolean = false;

    days = new FormControl();
    daysList: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    viewMode: number;
    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '10rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
        toolbarHiddenButtons: [
            [

                'undo',
                'redo',
                'strikeThrough',
                'subscript',
                'superscript',
                'justifyLeft',
                'justifyCenter',
                'justifyRight',
                // 'justifyFull',
                'indent',
                'outdent',
                'insertUnorderedList',
                'insertOrderedList',
                'heading',
                'fontName',
                'fontSize',
                'textColor',
                'backgroundColor',
                'customClasses',
                'insertHorizontalRule',
                'removeFormat',
                'toggleEditorMode'
            ]
        ],

    };

    _model: SliderPanelModel = new SliderPanelModel();
    public selectedFile: File = null;
    imgURL: any;
    menus: any;
    eventId: any;
    sid: any;
    items: any = [];
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
        private eventservice: EventService,
        private subsservice: SubscriptionService,
        private batchservice: BatchService,
        private activatedroute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.listentoURL();
        this.getfrequencydata();
        this.viewMode = this.model ? this.model['viewMode'] : null;
    }

    listentoURL() {
        this.activatedroute.params.subscribe(res => {
            this.eventId = res.eventId;
            this.getsubscription();
            this._cdRef.markForCheck();
        })
    }

    saveAction() {
        if (!this._model) {
            return;
        }
        if (this.sid) {
            this._model.sid = this.sid;
            this._model.uuid = this.uuid;
        }
        if (this._model.viewMode === 1) {
            this._model.haslimit = this.limitvalue;
        }
        if (this.id) {
            this._model.frequency = this.id;
        }
        this._model.frequency_config = JSON.stringify(this.days.value)
        if (this.days.value == null) {
            this._model.frequency_config = JSON.stringify(this.daysList);
        }
        this._model.listener.next({ event: this._model.viewMode, data: this._model });
    }

    getsubscription() {
        this.subsservice.subscriptionByID(this.eventId).subscribe(
            (res) => {
                if (res["metaData"] && res["metaData"].length) {
                    this.items = res["metaData"];
                }
                this._cdRef.markForCheck();
            }
        );
    }



    slide(data) {
        if (data.checked === true) {
            this.limitvalue = 1;
            this.limittext = 'Limit';
        } else {
            this.limitvalue = 0;
            this.limittext = 'No Limit';
        }
    }

    selectedsubscription(data) {
        this.sid = data.subscription_id;
        this.uuid = data.uuid;
        this._cdRef.markForCheck();
    }

    frequencylist(data) {
        if (!data) {
            return;
        }
        this.id = data.frequency_id;
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
            case SliderViewMode.CREATE: return header ? 'Add Batch' : 'add';
            case SliderViewMode.EDIT: return header ? 'Edit Batches' : 'add';
            case SliderViewMode.INFO: return header ? 'Our Batches' : 'edit';
        }
    }

    getfrequencydata() {
        this.batchservice.getfrequency().subscribe((res) => {
            this.menus = res["metaData"];
            this._cdRef.markForCheck();
        });
    }
    closesilder() {
        this.closeslider.next();
    }
}