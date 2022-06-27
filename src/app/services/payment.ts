import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

@Injectable({ providedIn: "root" })
export class PaymentService {
  constructor(private http: HttpClient) { }

  public ordergenerate(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/payment/create-order`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public paymentgenerate(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/eventregistration/`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public paymentgeneratenew(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/eventregistration/Registration`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public paymentgeneratefortrainers(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/auth/trainer-signup`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public paymentAll(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/join/paymentdetails`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  // public paymentAllRP(model): Observable<ApiResponse> {
  //   const url = `${window["API_URI"]}/rp-transactions/all-payments`;
  //   return this.http.post(url,model,{ responseType: "json", observe: "body" });
  // }

  public capturepayment(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/payment/capture-payment`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }
  // //getting payment details for the trainer
  // public getpaymentfortrainer(trainerId): Observable<ApiResponse> {
  //   if (!trainerId) {
  //     return null;
  //   }
  //   const url = `${window["API_URI"]}/join/status/${trainerId}`;
  //   return this.http.get(url, { responseType: "json", observe: "body" });
  // }
  //getting payment details for the user
  public getpaymentforuser(useruuid): Observable<ApiResponse> {
    if (!useruuid) {
      return null;
    }
    const url = `${window["API_URI"]}/join/onuserid/${useruuid}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
  //getting payment details for the trainer
  public getpaymentfortrainer(useruuid): Observable<ApiResponse> {
    if (!useruuid) {
      return null;
    }
    const url = `${window["API_URI"]}/join/instructorid/${useruuid}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
}
