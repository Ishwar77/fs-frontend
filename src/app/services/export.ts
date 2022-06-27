import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ExportService {
    constructor(
        private http: HttpClient
    ) { }

    public alluserdetails(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/alluserdetails`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allactiveuserdetails(): Observable<ApiResponse> { //used
        const url = `${window["API_URI"]}/export/activeuserdetails`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allinactiveuserdetails(): Observable<ApiResponse> { //used
        const url = `${window["API_URI"]}/export/inactiveuserdetails`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allactivesubscribedusers(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/getactivesubscriptiondetails`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allexpiredsubscribedusers(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/expiredsubscriptiondetails`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allsubscribedusers(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/getallsubscriptiondetails`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allbatches(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/batches`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allactivebatches(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/onlyactivebatches`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allinactivebatches(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/thatarenotactivebatches`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allcoupons(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/coupons`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allactivecoupons(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/existingactivecoupons`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allinactivecoupons(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/expiredinactivecoupons`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public eventsbasedontraineruuid(uuid): Observable<ApiResponse> {
        if (!uuid) {
            return null;
        }
        const url = `${window["API_URI"]}/export/eventontrainerid/${uuid}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public attendanceonbatchuuidanddate(batchuuid, date): Observable<ApiResponse> {
        if (!batchuuid && !date) {
            return null;
        }
        const url = `${window["API_URI"]}/export/attendeesbatchid/${batchuuid}/atendeeslistobdate/${date}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allevents(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/events`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allactiveevents(): Observable<ApiResponse> { //used
        const url = `${window["API_URI"]}/export/existingevents`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allexpiredevents(): Observable<ApiResponse> { //used
        const url = `${window["API_URI"]}/export/exeventsexpired`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allattendance(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/export/allattendance`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public allpayments(): Observable<ApiResponse> { //used
        const url = `${window["API_URI"]}/export/payment`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
}