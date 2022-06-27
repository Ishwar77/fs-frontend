//import { joi } from '@hapi/joi';
//const JOI = require("@hapi/joi");

export class ForgotpasswordModel {
  email?: string;
  token?: string;
  password?: string;
  cpassword?: string;

  constructor(un = "", tk = "", ps = "", cps = "") {
    this.email = un;
    this.token = tk;
    this.password = ps;
    this.cpassword = cps;
  }

  public static clearAll(model) {
    if (!model) {
      return;
    }

    model.email = "";
    model.token = "";
    model.password = "";
    model.cpassword = "";
  }

  // public static getValidationSchema() {
  //   return joi.object({
  //     token: joi.string().required().label("Token"),
  //     email: joi.string()
  //       .email({ tlds: { allow: false } })
  //       .min(5)
  //       .max(120)
  //       .required()
  //       .label("Email"),
  //     password: joi.string().min(8).max(120).required().label("Password"),
  //     cpassword: joi.string().min(8).max(120).required().label("Confirm Password"),

  //   });
  // }

  // public static isValid(obj) {
  //   if (!obj) {
  //     return { error: "Missing Validation object" };
  //   }
  //   const res = ForgotpasswordModel.getValidationSchema().validate(obj);
  //   return res.error || null;
  // }
}
export class ChangePassModel {
  password?: string;
  cpassword?: string;

  constructor(password, cpassword) {
    this.password = password;
    this.cpassword = cpassword;
  }
  public static clearAll(model) {
    if (!model) return;

    model.password = "";
    model.cpassword = "";
  }

  // public static getValidationSchema() {
  //   return joi.object({

  //     password: joi.string().min(8).max(120).required().label("Password"),
  //     cpassword: joi.string().min(8).max(120).required().label("Confirm Password"),

  //   });
  // }

  // public static isValid(obj) {
  //   if (!obj) {
  //     return { error: "Missing Validation object" };
  //   }
  //   const res = ChangePassModel.getValidationSchema().validate(obj);
  //   return res.error || null;
  // }
}
