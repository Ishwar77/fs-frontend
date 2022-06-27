import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

@Injectable({ providedIn: "root" })
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  public subscriptionAll(from = 0, limit = 100): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/subscription?from=${from}&limit=${limit}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public subscriptionByID(eventId): Observable<ApiResponse> {
    if (!eventId) {
      return null;
    }
    const url = `${window["API_URI"]}/subscription/eventid/${eventId}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public subscriptionByuuID(uuId): Observable<ApiResponse> {
    if (!uuId) {
      return null;
    }
    const url = `${window["API_URI"]}/subscription/eventid/${uuId}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public addsubscription(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/subscription`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public deletesubscription(subsId): Observable<ApiResponse> {
    if (!subsId) {
      return null;
    }
    const url = `${window["API_URI"]}/subscription/${subsId}`;
    return this.http.delete(url, { responseType: "json", observe: "body" });
  }

  public updatesubscription(subsId, model): Observable<ApiResponse> {
    if (!subsId && !model) {
      return null;
    }
    const url = `${window["API_URI"]}/subscription/${subsId}`;
    return this.http.put(url, model, { responseType: "json", observe: "body" });
  }



}
