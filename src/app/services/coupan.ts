import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

@Injectable({ providedIn: "root" })
export class CoupanService {
  constructor(private http: HttpClient) { }

  public coupanAll(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/coupon/`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public coupanByID(eventId): Observable<ApiResponse> {
    if (!eventId) {
      return null;
    }
    const url = `${window["API_URI"]}/coupon/event/${eventId}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public addcoupon(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/coupon`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public deletecoupon(couponId): Observable<ApiResponse> {
    if (!couponId) {
      return null;
    }
    const url = `${window["API_URI"]}/coupon/${couponId}`;
    return this.http.delete(url, { responseType: "json", observe: "body" });
  }

  public updatecoupon(couponId, model): Observable<ApiResponse> {
    if (!couponId && !model) {
      return null;
    }
    const url = `${window["API_URI"]}/coupon/${couponId}`;
    return this.http.put(url, model, { responseType: "json", observe: "body" });
  }

  public privatecoupon(code, eventId): Observable<ApiResponse> {
    if (!code && !eventId) {
      return null;
    }
    const url = `${window["API_URI"]}/coupon/code/${code}/${eventId}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public getallprivateandpubliccoupons(eventuuid): Observable<ApiResponse> {
    if (!eventuuid) {
      return null;
    }
    const url = `${window["API_URI"]}/coupon/event/${eventuuid}?privateCoupons=all`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
}