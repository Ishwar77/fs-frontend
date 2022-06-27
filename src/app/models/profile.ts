export class ProfileModel {
    height?: any;
    weight?: any;
    bmi?: any;
    password?: string;
    cpassword?: string;
    about?: any;

    constructor(height = "", weight = "", bmi = "", pass = '', cpass = '', about = '') {
        this.height = height;
        this.weight = weight;
        this.bmi = bmi;
        this.password = pass;
        this.cpassword = cpass;
        this.about = about;
    }
    public static clearall(model) {
        if (!model) {
            return
        }
        // model.height = "";
        // model.weight = "";
        // model.bmi = "";
        model.password = "";
        model.cpassword = "";
    }
}