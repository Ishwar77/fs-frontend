export class CouponModel {
  title?: any;
  discount_percent?: any;
  max_discount_amount?: any;
  max_usage_count?: any;
  expiry?: any;

  constructor(ti = "", dis = "", max = "", maxu = "", ex = "") {
    this.title = ti;
    this.discount_percent = dis;
    this.max_discount_amount = max;
    this.max_usage_count = maxu;
    this.expiry = ex;
  }

  public static clearall(model) {
    if (!model) {
      return null;
    }
    model.title = "";
    model.discount_percent = "";
    model.max_discount_amount = "";
    model.max_usage_count = "";
    model.expiry = "";
  }
}
