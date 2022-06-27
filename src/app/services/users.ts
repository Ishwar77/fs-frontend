import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

import { HttpErrorResponse } from "@angular/common/http";
import { throwError as observableThrowError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) { }

  public userList(userRole): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/users/all/${userRole}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public inactiveuserlist(userRole): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/users/blocked/${userRole}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }

  public blockusers(userID, model): Observable<ApiResponse> {
    if (!userID && !model) {
      return null;
    }
    const url = `${window["API_URI"]}/users/${userID}`;
    return this.http.put(url, model, { responseType: "json", observe: "body" });
  }

  public allcounts(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/join/activecount`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
  public allcountsfortrainer(trainerId): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/join/traineractiveevent/${trainerId}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
  public userroleList(): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/rolemaster?from=0&limit=10`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
  //active users for trainer
  public userlistfortrainer(uuid): Observable<ApiResponse> {
    if (!uuid) {
      return null;
    }
    const url = `${window["API_URI"]}/join/instructorid/${uuid}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
  //inactive users for trainer
  public inactiveuserlistfortrainer(uuid): Observable<ApiResponse> {
    if (!uuid) {
      return null;
    }
    const url = `${window["API_URI"]}/join/notactive/instructorid/${uuid}`;
    return this.http.get(url, { responseType: "json", observe: "body" });
  }
}
