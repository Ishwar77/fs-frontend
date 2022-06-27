import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class RatingService {
    constructor(
        private http: HttpClient
    ) { }
    //create a ratings
    public createratings(model): Observable<ApiResponse> {
        if (!model) {
            return null;
        }
        const url = `${window["API_URI"]}/trainerrating/`;
        return this.http.post(url, model, { responseType: 'json', observe: 'body' });
    }
    //get all ratings
    public getall(): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/trainerrating`
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    //get by trainerid
    public getbytrainer(trainerId): Observable<ApiResponse> {
        if (!trainerId) {
            return null;
        }
        const url = `${window["API_URI"]}/trainerrating/${trainerId}`
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    //get by userid
    public getbyuser(userId): Observable<ApiResponse> {
        if (!userId) {
            return null;
        }
        const url = `${window["API_URI"]}/trainerrating/user/${userId}`
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    //update by userid
    public updaterating(userId, model): Observable<ApiResponse> {
        if (!userId && !model) {
            return null;
        }
        const url = `${window["API_URI"]}/trainerrating/${userId}`
        return this.http.put(url, model, { responseType: 'json', observe: 'body' });
    }
    //delete by ratingid
    public deleterating(ratingId): Observable<ApiResponse> {
        if (!ratingId) {
            return null;
        }
        const url = `${window["API_URI"]}/trainerrating/${ratingId}`
        return this.http.delete(url, { responseType: 'json', observe: 'body' });
    }
}