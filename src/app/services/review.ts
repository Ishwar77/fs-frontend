import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

@Injectable({ providedIn: "root" })
export class ReviewService {
  constructor(private http: HttpClient) { }

  public reviewAll(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/join/allreview`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public reviewAllbyEventID(eventId: number): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/join/testimonies/${eventId}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public reviewById(eventId): Observable<ApiResponse> {
    if (!eventId) {
      return null;
    }
    const url = `${window["API_URI"]}/review/eventid/${eventId}/`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public addReview(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/review`;
    return this.http.post(url, model, { responseType: "json", observe: "body" });
  }

  public reviewByuseruuId(uuId): Observable<ApiResponse> {
    if (!uuId) {
      return null;
    }
    const url = `${window["API_URI"]}/review/userid/${uuId}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public updatereview(Id, model): Observable<ApiResponse> {
    if (!Id && !model) {
      return null;
    }
    const url = `${window["API_URI"]}/review/updateonuuid/${Id}`;
    return this.http.put(url, model, { responseType: "json", observe: "body" });
  }

  public deletereview(Id): Observable<ApiResponse> {
    if (!Id) {
      return null;
    }
    const url = `${window["API_URI"]}/review/deleteonuuid/${Id}`;
    return this.http.delete(url, { responseType: "json", observe: "body" });
  }
}