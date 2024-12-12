import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable, of } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';

import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage,
  ) { }

  baseUrl = 'http://localhost:3000/api';
  tripsUrl = this.baseUrl + '/trips';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, formData, {
      headers: {
        Authorization: ('Bearer ' +
          this.storage.getItem('travlr-token')) as string,
      },
    });
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(this.tripsUrl + '/' + tripCode);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      this.tripsUrl + '/' + formData.code,
      formData,
      {
        headers: {
          Authorization: ('Bearer ' +
            this.storage.getItem('travlr-token')) as string,
        },
      },
    );
  }

  async deleteTrip(tripCode: string): Promise<Trip> {
    console.log('Deleting trip in tripdataservice: ' + tripCode);
    try {
      const response = await lastValueFrom(
        this.http.delete<Trip>(this.tripsUrl + '/' + tripCode, {
          headers: {
            Authorization: ('Bearer ' +
              this.storage.getItem('travlr-token')) as string,
          },
        }),
      );
      console.log('response from deleting trip: ', response);
      return response;
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  private async makeAuthApiCall(
    urlPath: string,
    user: User,
  ): Promise<AuthResponse> {
    const url = `${this.baseUrl}/${urlPath}`;
    try {
      const response = await lastValueFrom(
        this.http.post<AuthResponse>(url, user),
      );
      // .toPromise() is deprecated
      // https://stackoverflow.com/questions/36777284/angular-2-convert-observable-to-promise
      return response;
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }
}
