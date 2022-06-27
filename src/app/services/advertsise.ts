import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

@Injectable({ providedIn: "root" })
export class AdvertiseService {
  constructor(private http: HttpClient) {}

  // Advertise Master Services
  //1. Advertise Master all list displayed
  public advertiseMasterAll(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/spot`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

    //2. Advertise Master New Data Added
  public advertiseMasterAdd(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/spot`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

    //3. Advertise Master Delete
  public deleteAdvertseMaster(advertiseMasterID): Observable<ApiResponse> {
    if (!advertiseMasterID) {
      return null;
    }
    const url = `${window["API_URI"]}/spot/${advertiseMasterID}`;
    return this.http.delete(url, { responseType: "json", observe: "body" });
  }

  public updateAdvertiseMaster(advertiseMasterID, model): Observable<ApiResponse> {
    if (!advertiseMasterID && !model) {
      return null;
    }
    const url = `${window["API_URI"]}/spot/${advertiseMasterID}`;
    return this.http.put(url, model, { responseType: "json", observe: "body" });
  }

  public advertisePostUser(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/advertisement/adding`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public advertiseGetAll(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/advertisement`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
}
