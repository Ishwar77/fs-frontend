import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

@Injectable({ providedIn: "root" })
export class ForgotService {
  constructor(private http: HttpClient) {}
  public passwordservice(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/auth/forget`;
    return this.http.post(url, model, {responseType: "json",observe: "body"});
  }
  public resetservice(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/auth/reset`;
    return this.http.post(url, model, {responseType: "json",observe: "body"});
  }
  public changepassword(model): Observable<ApiResponse> {
    if(!model) {
      return null;
    }
    const url = `${window["API_URI"]}/auth/update`;
    return this.http.post(url, model, {responseType: "json",observe: "body",});
  }
}
