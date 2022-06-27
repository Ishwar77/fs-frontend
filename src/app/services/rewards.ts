import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class RewardService {
    constructor(
        private http: HttpClient
    ) { }
    //get the reward service
    public getrewardsservice(userId): Observable<ApiResponse> {
        if (!userId) {
            return null;
        }
        const url = `${window["API_URI"]}/rewards/user/${userId}?isuuid=true`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    //create aother row in uswer points table 
    public updateservice(model): Observable<ApiResponse> {
        if (!model) {
            return null;
        }
        const url = `${window["API_URI"]}/rewards/creating`;
        return this.http.post(url, model, { responseType: 'json', observe: 'body' });
    }
}