export class AdvertiseModel {
  name?: string;
  days?: any;
  amount?: any;
  ad_title?: any;
  ad_image?: any;
  ad_description?: any;
  ad_spot?: any;
  ad_startDate?: any;
  adTrainerID?: any;
  adAmount?: any;
  adDays?: any;
  adOrderID?: any;
  adPaymentID?: any;
  adStatus?: any;

  constructor(na = "", dy = "", amt = "", atit = "", aimg = "", adesc = "", aspot = "", asdt = "", tid = "", adamt = "", addys = "",
    adoid = "", adpid = "", adsts = "", ) {
    this.name = na;
    this.days = dy;
    this.amount = amt;
    this.ad_title = atit;
    this.ad_image = aimg;
    this.ad_description = adesc;
    this.ad_spot = aspot;
    this.ad_startDate = asdt;
    this.adAmount = adamt;
    this.adTrainerID = tid;
    this.adDays = addys;
    this.adOrderID = adoid;
    this.adPaymentID = adpid;
    this.adStatus = adsts;
  }

  public static clearall(model) {
    if (!model) {
      return;
    }
    model.name = "";
    model.days = "";
    model.amount = "";
    model.ad_title = "";
    model.ad_description = "";
    model.ad_image = "";
    model.ad_startDate = "";
    model.adAmount = "";
    model.adTrainerID = "";
    model.adDays = "";
    model.adOrderID = "";
    model.adPaymentID = "";
    model.adStatus = "";
  }
}
