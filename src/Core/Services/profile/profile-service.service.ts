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

  createProfile(formData: FormData): Observable<IProfile> {
    return this._httpClient.post<IProfile>(this.profileUrl, formData);
  }

  updateProfile(id: number, formData: FormData): Observable<void> {
    return this._httpClient.put<void>(`${this.profileUrl}/${id}`, formData);
  }
}
