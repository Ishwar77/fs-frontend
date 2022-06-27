
export enum AppCardComponentAction {
    CARD_CLICK = 1,
    SUMMARY_CLICK = 2,
    SLIDER_CLOSE = 3,
}

export interface IAppCardComponentEvent {
    action: AppCardComponentAction;
    data: AppCardComponentInput;
}


export class AppCardComponentInput {
    id?: number;
    title?: string;
    type?: string;
    description?: string;
    isActive?: boolean;
    img?: string;
    startdate?: Date;
    expirydate?: Date;
    link?:any;
    metaData?: any;
    createdby?: string;
    constructor(title, description, img, createdby, isActive = false, type, id, expirydate = new Date(), metaData = null) {
        this.title = title || '';
        this.description = description || '';
        this.isActive = isActive;
        this.metaData = metaData;
        this.id = id;
        this.type = type;
        this.img = img;
        this.createdby = createdby;
        this.expirydate = expirydate;
    }

    public static getDummyCard() {
        return new AppCardComponentInput('This is the name of the card which is lame one', 'This is the name of the card which is lame one This is some description text', '', '', false, 'texture', new Date().getTime());
    }
}
