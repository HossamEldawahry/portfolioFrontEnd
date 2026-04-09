import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from '../../Models/iprofile';
import { apiV1BaseUrl } from '../../server/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private readonly profileUrl = `${apiV1BaseUrl}/profile`;

  constructor(private _httpClient: HttpClient) { }

  getProfile(): Observable<IProfile> {
    return this._httpClient.get<IProfile>(`${this.profileUrl}/current`);
  }
}
