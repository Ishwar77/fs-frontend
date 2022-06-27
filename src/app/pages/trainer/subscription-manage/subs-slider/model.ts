import { Subject } from 'rxjs';

export enum SliderPanelActionEvent {
    SAVE = 1
}

export enum SliderViewMode {
    CREATE = 1,
    EDIT = 2,
    INFO = 3,
    DELETE = 4
}

export interface SliderPanelResponse {
    event: SliderViewMode;
    data: SliderPanelModel;
}

export class SliderPanelModel {
    id?: any;
    days?: any;
    amount?: any;
    tax?: any;
    batchs?: any;
    duration?: any;
    viewMode?: SliderViewMode;
    listener: Subject<SliderPanelResponse> = new Subject<SliderPanelResponse>();
    metaData?: any;

    constructor(id = "", da = "", am = "", ta = "", ba = '', dura = '', viewMode = SliderViewMode.CREATE, metaData?: any) {
        this.id = id || '';
        this.days = da;
        this.amount = am;
        this.tax = ta;
        this.batchs = ba;
        this.duration = dura;
        this.viewMode = viewMode || SliderViewMode.CREATE;
        this.metaData = metaData;
    }
}