//import { JOI } from '@hapi/joi';
//const JOI = require("@hapi/joi");
export class LoginModel {
  email?: string;
  password?: string;
  rememberMe?: boolean;

  constructor(un = "", ps = "", rem = false) {
    this.email = un;
    this.password = ps;
    this.rememberMe = rem;
  }

  public static clearAll(model) {
    if (!model) return;

    model.email = "";
    model.password = "";
    model.rememberMe = false;
  }

  // public static getValidationSchema() {
  //   return JOI.object({

  //     email: JOI.string()
  //       .email({ tlds: { allow: false } })
  //       .min(5)
  //       .max(120)
  //       .required()
  //       .label("Email"),
  //     password: JOI.string().min(8).max(120).required().label("Password"),

  //   });
  // }

  // public static isValid(obj) {
  //   if (!obj) {
  //     return { error: "Missing Validation object" };

  //   }
  //   const res = LoginModel.getValidationSchema().validate(obj);
  //   return res.error || null;
  // }
}
