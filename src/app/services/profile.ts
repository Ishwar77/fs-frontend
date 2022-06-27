import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

@Injectable({ providedIn: "root" })
export class ProfileService {
  constructor(private http: HttpClient) { }

  public getprofiledetails(userID): Observable<ApiResponse> {
    if (!userID) {
      return null;
    }
    const url = window["API_URI"] + `/users/uuid/${userID}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public getprofiledetailsbyname(username): Observable<ApiResponse> {
    if (!username) {
      return null;
    }
    const url = window["API_URI"] + `/users/page-name/${username}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public getprofileadditionaldetails(userID): Observable<ApiResponse> {
    if (!userID) {
      return null;
    }
    const url = window["API_URI"] + `/fitnessinfo/user/${userID}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public addfitnessdetails(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/fitnessinfo`;
    return this.http.post(url, model, { responseType: 'json', observe: 'body' });
  }

  public updateinfo(userID, model): Observable<ApiResponse> {
    if (!userID && !model) {
      return null;
    }
    const url = window["API_URI"] + `/users/${userID}`;
    return this.http.put(url, model, { responseType: "json", observe: "body" });
  }

  public updatefitnessinfo(userID, model): Observable<ApiResponse> {
    if (!userID && !model) {
      return null;
    }
    const url = window["API_URI"] + `/fitnessinfo/${userID}`;
    return this.http.put(url, model, { responseType: "json", observe: "body" });
  }

  public passwordupdate(userID, model): Observable<ApiResponse> {
    if (!userID && !model) {
      return null;
    }
    const url = window["API_URI"] + `/auth/${userID}`;
    return this.http.put(url, model, { responseType: "json", observe: "body" });
  }

  public ProfileChange(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/files/`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public AdvertiseImageUpload(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/uploads/advertise`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public UserProfilePictureUpload(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/uploads/users`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public EventCoverImageUpload(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/uploads/event`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }
}