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
    title?: any;
    discount_percent?: any;
    max_discount_amount?: any;
    max_usage_count?: any;
    expiry?: any;
    type?:any;
    viewMode?: SliderViewMode;
    listener: Subject<SliderPanelResponse> = new Subject<SliderPanelResponse>();
    metaData?: any;

    constructor(id = '', ti = "", dis = "", max = "", maxu = "",ty = "", ex = "", viewMode = SliderViewMode.CREATE, metaData?: any) {
        this.id = id || '';
        this.title = ti;
        this.discount_percent = dis;
        this.type = ty;
        this.max_discount_amount = max;
        this.max_usage_count = maxu;
        this.expiry = ex;
        this.viewMode = viewMode || SliderViewMode.CREATE;
        this.metaData = metaData;
    }
}