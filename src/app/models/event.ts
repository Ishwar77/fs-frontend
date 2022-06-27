export class EventModel {
  id?: any;
  name?: string;
  description?: any;
  image?: any;
  price?: any;
  period?: any;
  startdate?: any;
  enddate?: any;
  starttime?: any;
  endtime?: any;
  link?:any;

  constructor(
    id = "",
    na = "",
    ds = "",
    im = "",
    pri = "",
    pr = "",
    sd = "",
    ed = "",
    st = "",
    et = "",
    li = ""
  ) {
    this.id = id;
    this.name = na;
    this.description = ds;
    this.image = im;
    this.price = pri;
    this.period = pr;
    this.startdate = sd;
    this.enddate = ed;
    this.starttime = st;
    this.endtime = et;
    this.link = li;
  }

  public static clearall(model) {
    if (!model) {
      return;
    }
    model.id = "";
    model.name = "";
    model.description = "";
    model.image = "";
    model.price = "";
    model.period = "";
    model.startdate = "";
    model.enddate = "";
    model.starttime = "";
    model.endtime = "";
    model.link = "";
  }
}
