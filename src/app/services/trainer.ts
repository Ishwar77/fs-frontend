import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class TrainerService {

    constructor(
        private http: HttpClient
    ) { }

    public activeevents(trainerId): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/events/oninstructorid/${trainerId}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }
    public topTrainers(): Observable<ApiResponse> {
      const url = `${window["API_URI"]}/join/peaktrainer`;
      return this.http.get(url, { responseType: "json", observe: "body" });
    }
    public inactiveevents(trainerId): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/events/blocked/${trainerId}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }

    public usersfortrainers(eventId, trainerId): Observable<ApiResponse> {
        if (!eventId && !trainerId) {
            return null;
        }
        const url = `${window["API_URI"]}/join/event/${eventId}/instructor/${trainerId}`;
        return this.http.get(url, { responseType: 'json', observe: 'body' });
    }

    public onboardClients(trainerId, file: any): Observable<ApiResponse> {
        const url = `${window["API_URI"]}/users/onboard/${trainerId}`;
        return this.http.post(url, file, { responseType: 'json', observe: 'body' });
    }
}
