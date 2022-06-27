//import { JOI } from '@hapi/joi';
// const JOI = import("@hapi/joi");
export class ContactModel {
  full_name?: any;
  email?: any;
  mobile_number?: any;
  subject?: any;
  message?: any;

  constructor(fn = "", ln = "", cn = "", lk = "", mn = "") {
    this.full_name = fn;
    this.email = ln;
    this.mobile_number = cn;
    this.subject = lk;
    this.message = mn;
  }

  public static clearAll(model) {
    if (!model) {
      return;
    }
    model.full_name = "";
    model.email = "";
    model.mobile_number = "";
    model.subject = "";
    model.message = "";
  }

  // public static getValidationSchema() {
  //   return JOI.object({

  //     full_name: JOI.string().min(2).max(50).required().label("Name"),
  //     email: JOI.string()
  //       .email({ tlds: { allow: false } })
  //       .min(5)
  //       .max(120)
  //       .required()
  //       .label("Email"),
  //       mobile_number: JOI.number().min(8).required().label("Mobile Number"),
  //       subject: JOI.string().required().label("Subject"),
  //       message: JOI.string().required().label("message"),

  //   });
  // }

  // public static isValid(obj) {
  //   if (!obj) {
  //     return { error: "Missing Validation object" };
  //   }
  //   const res = ContactModel.getValidationSchema().validate(obj);
  //   return res.error || null;
  // }
}
