export class SubscriptionModel {
  days?: any;
  amount?: any;
  tax?: any;
  batchs?: any;
  duration?: any;

  constructor(da = "", am = "", ta = "", ba = '', dura: '') {
    this.days = da;
    this.amount = am;
    this.tax = ta;
    this.batchs = ba;
    this.duration = dura;
  }

  public static clearall(model) {
    if (!model) {
      return null;
    }
    model.days = "";
    model.amount = "";
    model.tax = "";
    model.batchs = '';
    model.duration = '';
  }
}
