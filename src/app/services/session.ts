import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class SessionService {
    constructor(
        private http: HttpClient
    ) { }
    //create a session
    public createsession(model): Observable<ApiResponse> {
        if (!model) {
            return null;
        }
        const url = `${window["API_URI"]}/session/`;
        return this.http.post(url, model, { responseType: 'json', observe: 'body' });
    }
    //get all session
    public getallsession(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/session/`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    //get session details by user id
    public getsessiobbyuserid(userId): Observable<ApiResponse> {
        if (!userId) {
            return null;
        }
        const url = `${window["API_URI"]}/session/${userId}`
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    //delete session by user id
    public deletesession(userId): Observable<ApiResponse> {
        if (!userId) {
            return null;
        }
        const url = `${window["API_URI"]}/session/${userId}`
        return this.http.delete(url, { responseType: 'json', observe: 'body' });
    }
    //get the ip address
    public getip() {
        return this.http.get("https://api.ipify.org/?format=json");
    }
}