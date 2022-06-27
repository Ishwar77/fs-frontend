import { JOI } from "@hapi/joi";
//const JOI = require("@hapi/joi");
export class SignUpModel {
  name?: string;
  dob?: string;
  gender?: string;
  email?: string;
  mobile?: string;
  password?: string;
  cpassword?: string;
  userRoleId?: string;
  referral_code?: any;

  constructor(
    na = "",
    db = "",
    gn = "",
    em = "",
    mb = "",
    ps = "",
    rps = "",
    ur = "",re = ""
  ) {
    this.name = na;
    this.dob = db;
    this.gender = gn;
    this.email = em;
    this.mobile = mb;
    this.password = ps;
    this.cpassword = rps;
    this.userRoleId = ur;
    this.referral_code = re;
  }

  public static clearAll(model) {
    if (!model) {
      return;
    }

    model.name = "";
    model.dob = "";
    model.gender = "";
    model.email = "";
    model.mobile = "";
    model.password = "";
    model.cpassword = "";
    model.userRoleId = "";
    model.referral_code = "";
  }

  // public static getValidationSchema() {
  //   return JOI.object({

  //     name: JOI.string().min(2).max(50).required().label("Name"),
  //     dob: JOI.string().required().label("Date of Birth"),
  //     //gender: JOI.string().required().label("Gender"),

  //     email: JOI.string()
  //       .email({ tlds: { allow: false } })
  //       .min(5)
  //       .max(120)
  //       .required()
  //       .label("Email"),
  //       mobile: JOI.number().min(8).required().label("Mobile Number"),
  //     password: JOI.string().min(8).max(120).required().label("Password"),
  //     cpassword: JOI.string()
  //       .min(8)
  //       .max(120)
  //       .required()
  //       .label("Confirm Password"),
  //    // profilepic_url: JOI.string().optional().allow("").label("Profile Image"),

  //   });
  // }

  // public static isValid(obj) {
  //   if (!obj) {
  //     return { error: "Missing Validation object" };
  //   }
  //   const res = SignUpModel.getValidationSchema().validate(obj);
  //   return res.error || null;
  // }
}
