import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class RedemptionService {
    constructor(
        private http: HttpClient
    ) { }
    //1.create the redemption request
    public createredemption(model): Observable<ApiResponse> {
        if (!model) {
            return null;
        }
        const url = `${window["API_URI"]}/points`;
        return this.http.post(url, model, { responseType: "json", observe: "body" });
    }
    //2.get all request
    public getallredemption(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/points`
        return this.http.get(url, { responseType: "json", observe: "body" });
    }
    //3.get by id
    public getallredemptionbyredemptionid(id): Observable<ApiResponse> {
        if (!id) {
            return null;
        }
        const url = `${window["API_URI"]}/points/${id}`
        return this.http.get(url, { responseType: "json", observe: "body" });
    }
    //4.get by event id
    public getbyeventid(id): Observable<ApiResponse> {
        if (!id) {
            return null;
        }
        const url = `${window["API_URI"]}/points/event/${id}`
        return this.http.get(url, { responseType: "json", observe: "body" });
    }
    //5.get by user id
    public getbyuserid(id): Observable<ApiResponse> {
        if (!id) {
            return null;
        }
        const url = `${window["API_URI"]}/points/user/${id}`
        return this.http.get(url, { responseType: "json", observe: "body" });
    }
    //6.get by trainer id
    public getbytrainerid(id): Observable<ApiResponse> {
        if (!id) {
            return null;
        }
        const url = `${window["API_URI"]}/points/trainer/${id}`
        return this.http.get(url, { responseType: "json", observe: "body" });
    }
    //7.update by user id
    public updatebyuserid(id, model): Observable<ApiResponse> {
        if (!id) {
            return null;
        }
        const url = `${window["API_URI"]}/points/${id}`
        return this.http.put(url, model, { responseType: "json", observe: "body" });
    }
    //8.reject by user id
    public rejectbyuserid(id): Observable<ApiResponse> {
        if (!id) {
            return null;
        }
        const url = `${window["API_URI"]}/points/reject/${id}`
        return this.http.put(url, { responseType: "json", observe: "body" });
    }
    //9.delete by user id
    public deletebyuserid(id): Observable<ApiResponse> {
        if (!id) {
            return null;
        }
        const url = `${window["API_URI"]}/points/${id}`
        return this.http.delete(url, { responseType: "json", observe: "body" });
    }
}