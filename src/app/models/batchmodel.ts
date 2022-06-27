export class BatchModel {
    starttime?: any;
    endtime?: any;
    haslimit?: any;
    batchsize?: any;
    frequency?: any;

    constructor(st = '', et = '', hl = '', bs = '', fr = '') {
        this.starttime = st;
        this.endtime = et;
        this.haslimit = hl;
        this.batchsize = bs;
        this.frequency = fr;
    }

    public static clearall(model) {
        if (!model) {
            return null;
        }
        model.starttime = '';
        model.endtime = '';
        model.haslimit = '';
        model.batchsize = '';
        model.frequency = '';
    }
}