import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class BatchService {
    constructor(
        private http: HttpClient
    ) { }

    public addbatch(model): Observable<ApiResponse> {
        if (!model) {
            return null;
        }
        const url = `${window["API_URI"]}/batch`;
        return this.http.post(url, model, { responseType: 'json', observe: 'body' });
    }

    public getbatchBySubscription(subscriptionid): Observable<ApiResponse> {
        if (!subscriptionid) {
            return null;
        }
        const url = `${window["API_URI"]}/batch/subscriptionid/${subscriptionid}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }

    public getbatch(eventId): Observable<ApiResponse> {
        if (!eventId) {
            return null;
        }
        const url = `${window["API_URI"]}/batch/eventid/${eventId}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }

    public updateBatchTime(model): Observable<ApiResponse> {
        if (!model) {
            return null;
        }
        const url = window["API_URI"] + `/switchingbatch`;
        return this.http.put(url, model, { responseType: "json", observe: "body" });
    }

    public getfrequency(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/frequency`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }

    public editbatch(batchId, model): Observable<ApiResponse> {
        if (!batchId && !model) {
            return null;
        }
        const url = `${window["API_URI"]}/batch/${batchId}`;
        return this.http.put(url, model, { responseType: 'json', observe: 'body' });
    }

    public deletebatch(batchId): Observable<ApiResponse> {
        if (!batchId) {
            return null;
        }
        const url = `${window["API_URI"]}/batch/${batchId}`;
        return this.http.delete(url, { responseType: 'json', observe: 'body' });
    }
    public batchbasedonsubs(subId): Observable<ApiResponse> {
        if (!subId) {
            return null;
        }
        const url = `${window["API_URI"]}/batch/subscriptionid/${subId}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public getthebatchdetails(traineruuid): Observable<ApiResponse> {
        if (!traineruuid) {
            return null;
        }
        const url = `${window["API_URI"]}/batch/trainer/${traineruuid}?isUUid=true`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public getthebatchdetailsforuser(useruuid): Observable<ApiResponse> {
        if (!useruuid) {
            return null;
        }
        const url = `${window["API_URI"]}/join/nextuserbatch/${useruuid}?isUUid=true`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public getbatchbybatchid(batchId): Observable<ApiResponse> {
        if (!batchId) {
            return null;
        }
        const url = `${window["API_URI"]}/batch/${batchId}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public resumebatch(uuid, model): Observable<ApiResponse> {
        if (!uuid && !model) {
            return null;
        }
        const url = `${window["API_URI"]}/batch/start/${uuid}`;
        return this.http.put(url, model, { responseType: 'json', observe: 'body' });
    }
    public getattendancelist(uuid, date): Observable<ApiResponse> {
        if (!uuid && !date) {
            return null;
        }
        const url = `${window["API_URI"]}/join/attendeesbatchid/${uuid}/atendeeslistobdate/${date}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public switchbatch(model): Observable<ApiResponse> {
        if (!model) {
            return null;
        }
        const url = `${window["API_URI"]}/switchingbatch`;
        return this.http.post(url, model, { responseType: 'json', observe: 'body' });
    }
    public getregbatchid(regid): Observable<ApiResponse> {
        if (!regid) {
            return null;
        }
        const url = `${window["API_URI"]}/registerbatch/regid/${regid}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
}
