import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { profileBaseUrl } from '../../server/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(private _httpClient: HttpClient) { }
  getProfile() : Observable<any> {
    return this._httpClient.get(`${profileBaseUrl}/GetbyId/1`);
  }
}
