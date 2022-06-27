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
    sid?: any;
    subscription?: any;
    frequencylist?: any;
    frequency_config?: any;
    starttime?: any;
    endtime?: any;
    haslimit?: any;
    batchsize?: any;
    frequency?: any;
    available?:any;
    uuid?:any;
    viewMode?: SliderViewMode;
    listener: Subject<SliderPanelResponse> = new Subject<SliderPanelResponse>();
    metaData?: any;

    constructor(id = '', sid = '',fc = '', fl = '',av = '',uu = '',su = '', st = '', et = '', hl = '', bs = '', fr = '', viewMode = SliderViewMode.CREATE, metaData?: any) {
        this.id = id || '';
        this.sid = sid;
        this.subscription = su;
        this.frequency_config = fc;
        this.frequencylist = '';
        this.starttime = st;
        this.endtime = et;
        this.haslimit = hl;
        this.batchsize = bs;
        this.frequency = fr;
        this.available = av;
        this.uuid = uu;
        this.viewMode = viewMode || SliderViewMode.CREATE;
        this.metaData = metaData;
    }
}