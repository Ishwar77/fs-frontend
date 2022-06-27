import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';

@Component({
    selector: 'app-dashboard-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss']
})

export class WidgetsDashboardComponent implements OnInit {
    /** Emits Output Data */
    @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() meetingclicked: EventEmitter<any> = new EventEmitter<any>();

    /** Type of Dates for Component*/
    _type: string;
    @Input()
    get type() {
        return this._type;
    }
    set type(type: string) {
        this._type = type;
        this.cdRef.markForCheck();
    }

    /** Input Image for Component */
    _imgSrc: string;
    @Input()
    get imgSrc() {
        return this._imgSrc;
    }
    set imgSrc(img: string) {
        this._imgSrc = img;
        this.cdRef.markForCheck();
    }

    /** Input Title for component */
    public _title: string;
    @Input()
    get title() {
        return this._title;
    }
    set title(title: string) {
        this._title = title;
        this.cdRef.markForCheck();
    }

    /** Input Subheader for component */
    public _subheader: string;
    @Input()
    get subheader() {
        return this._subheader;
    }
    set subheader(subheader: string) {
        this._subheader = subheader;
        this.cdRef.markForCheck();
    }

    /** Input Counts for component */
    public _counts: number;
    @Input()
    get counts() {
        return this._counts;
    }
    set counts(count: number) {
        this._counts = count;
        this.cdRef.markForCheck();
    }

    /** Is Counts True || False for Component */
    _isCounts = false;
    @Input()
    get isCounts() {
        return this._isCounts;
    }
    set isCounts(v: boolean) {
        this._isCounts = v;
        this.cdRef.markForCheck();
    }

    public _subtime: any;
    @Input()
    get subtime() {
        return this._subtime;
    }
    set subtime(subtime: string) {
        this._subtime = subtime;
        this.cdRef.markForCheck();
    }
    public _progress: any;
    @Input()
    get progress() {
        return this._progress;
    }
    set progress(progress: string) {
        this._progress = progress;
        this.cdRef.markForCheck();
    }
    public _link: any;
    @Input()
    get link() {
        return this._link;
    }
    set link(link: string) {
        this._link = link;
        this.cdRef.markForCheck();
    }
    @Input() public password: any;
    @Input() public istrainer: any;

    constructor(
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
    }

    /** Emits Output Data */
    public cardClicked(data) {
        this.clicked.next(data);
    }
    //send the data
    senddata(link, password) {
        const updatable = {
            link: link ? link : '',
            password: password ? password : ''
        }
        this.meetingclicked.next(updatable);
    }
}
