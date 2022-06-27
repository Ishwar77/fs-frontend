import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

@Injectable({ providedIn: "root" })
export class LoginService {
  constructor(private http: HttpClient) { }

  public signup(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/auth/signup`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public login(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/auth/login`;
    return this.http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }

  public sessionStarter(): Observable<ApiResponse> {
    const url = window["API_URI"] + `/auth/init-session`;
    const guestData = {
      userRole: 2,
      userId: -1,
      isGuest: true,
    };
    return this.http.post(url, guestData, {
      responseType: "json",
      observe: "body",
    });
  }

  public emailtestservice(emailId): Observable<ApiResponse> {
    if (!emailId) {
      return null;
    }
    const url = `${window["API_URI"]}/users/checkingemail/${emailId}`;
    return this.http.get(url, { responseType: 'json', observe: 'body' });
  }
}