import { ApiResponse } from "../models/api-response";
import { ContactModel } from "../models/contact";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";

@Injectable({ providedIn: "root" })
export class ContactService {
  constructor(private _http: HttpClient) {}

  public contactAction(model: ContactModel): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = window["API_URI"] + `/contactus/`;
    return this._http.post(url, model, {
      responseType: "json",
      observe: "body",
    });
  }
  public getcontactAction(): Observable<ApiResponse> {
    const url = window["API_URI"] + `/contactus/`;
    return this._http.get(url, {responseType: "json",observe: "body",});
  }
  public deletecontact(contactId): Observable<ApiResponse> {
    if(!contactId) {
      return null;
    }
    const url = window["API_URI"] + `/contactus/${contactId}`;
    return this._http.delete(url, {responseType: "json",observe: "body",});
  }
}
