import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

@Injectable({ providedIn: "root" })
export class EventService {
  constructor(private http: HttpClient) {}

  public eventdata(from = 0, limit = 100): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/events?from=${from}&limit=${limit}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public inactiveeventdata(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/events/inactive`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public topEvents(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/join/topevents`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public eventinfo(eventId): Observable<ApiResponse> {
    if (!eventId) {
      return null;
    }
    const url = `${window["API_URI"]}/events/${eventId}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public eventinfobyuuid(uuId): Observable<ApiResponse> {
    if (!uuId) {
      return null;
    }
    const url = `${window["API_URI"]}/events/uuid/${uuId}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public addevent(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/events`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public eventmaster(from = 0, limit = 100): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/eventmaster?from=${from}&limit=${limit}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public updateevent(eventID, model): Observable<ApiResponse> {
    if (!eventID && !model) {
      return null;
    }
    const url = `${window["API_URI"]}/events/${eventID}`;
    return this.http.put(url, model, { responseType: "json", observe: "body" });
  }

  public registeredusers(userId): Observable<ApiResponse> {
    if (!userId) {
      return null;
    }
    //const url = `${window["API_URI"]}/join/userID/${userId}`;
    const url = `${window["API_URI"]}/eventregistration/userid/${userId}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public deleteevent(eventID): Observable<ApiResponse> {
    if (!eventID) {
      return null;
    }
    const url = `${window["API_URI"]}/events/${eventID}`;
    return this.http.delete(url, { responseType: "json", observe: "body" });
  }

  public EventRegistration(eventID): Observable<ApiResponse> {
    if (!eventID) {
      return null;
    }
    const url = `${window["API_URI"]}/eventregistration/${eventID}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
  public subscriptionExpAll(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/export/getallsubscriptiondetails`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
  public subscriptionInActive(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/export/expiredsubscriptiondetails`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
  public subscriptionActive(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/export/getactivesubscriptiondetails`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
}
