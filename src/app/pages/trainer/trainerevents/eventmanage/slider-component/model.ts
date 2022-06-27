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
    name?: string;
    type?: string;
    description?: string;
    image?: any;
    price?: any;
    period?: any;
    startdate?: any;
    enddate?: any;
    starttime?: any;
    endtime?: any;
  //  link?: any;
    viewMode?: SliderViewMode;
    listener: Subject<SliderPanelResponse> = new Subject<SliderPanelResponse>();
    metaData?: any;

    constructor(id = '', name = '', desc = '', type = '', image = '', price = '', period = '', startdate = '', enddate = '', starttime = '',
        endtime = '', viewMode = SliderViewMode.CREATE, metaData?: any) {
        this.id = id || '';
        this.name = name || '';
        this.description = desc || '';
        this.type = type || '';
        this.image = image || '';
        this.price = price || '';
        this.period = period || '';
        this.startdate = startdate || '';
        this.enddate = enddate || '';
        this.starttime = starttime || '';
        this.endtime = endtime || '';
      //  this.link = link || '';
        this.viewMode = viewMode || SliderViewMode.CREATE;
        this.metaData = metaData;
    }
}