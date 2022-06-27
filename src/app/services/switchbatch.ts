import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class SwitchbatchService {
    constructor(
        private http: HttpClient
    ) { }
    public getallbasedontraineruuid(uuid): Observable<ApiResponse> {
        if (!uuid) {
            return null;
        }
        const url = `${window["API_URI"]}/switchingbatch/trainer/${uuid}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public rejectbatch(userid, batchid, regbatchid): Observable<ApiResponse> {
        if (!userid && !batchid && !regbatchid) {
            return null;
        }
        const url = `${window["API_URI"]}/switchingbatch/reject/user/${userid}/batch/${batchid}/regbatch/${regbatchid}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public acceptbatch(regbatchid, model): Observable<ApiResponse> {
        if (!regbatchid && !model) {
            return null;
        }
        const url = `${window["API_URI"]}/switchingbatch/updatingontrainerapproval/${regbatchid}`;
        return this.http.put(url, model, { responseType: 'json', observe: 'body' });
    }

}