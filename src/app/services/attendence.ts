import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from '../models/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class AttendenceService {
  constructor(private httpClient: HttpClient) { }

  public getInfo(batchUUID): Observable<ApiResponse> {
    const url = `${window["API_URI"]}/registerbatch/batches/${batchUUID}`;
    return this.httpClient.get(url, { responseType: 'json', observe: 'body' });
  }

  public createattendance(model): Observable<ApiResponse> {
    if (!model) {
      return null;
    }
    const url = `${window["API_URI"]}/attendance/`;
    return this.httpClient.post(url, model, { responseType: 'json', observe: 'body' });
  }
}
