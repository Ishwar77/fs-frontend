
export enum CoupanCardComponentAction {
    CARD_CLICK = 1,
    SUMMARY_CLICK = 2,
    SLIDER_CLOSE = 3,
}

export interface ICoupanCardComponentEvent {
    action: CoupanCardComponentAction;
    data: CoupanCardComponentInput;
}


export class CoupanCardComponentInput {
    id?: number;
    title?: string;
    // type?: string;
    // description?: string;
    isActive?: boolean;
    // img?: string;
    startdate?: Date;
    expirydate?: Date;
    // link?:any;
    metaData?: any;
    createdby?: string;
    constructor(title, createdby, isActive = false, type, id, expirydate = new Date(), metaData = null) {
        this.title = title || '';
        // this.description = description || '';
        this.isActive = isActive;
        this.metaData = metaData;
        this.id = id;
        // this.type = type;
        // this.img = img;
        this.createdby = createdby;
        this.expirydate = expirydate;
    }

    public static getDummyCard() {
        return new CoupanCardComponentInput('This is the name of the card which is lame one', 'This is the name of the card which is lame one This is some description text', false, 'texture', new Date().getTime());
    }
}
