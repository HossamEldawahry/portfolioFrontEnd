import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { skillBaseUrl } from '../../server/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class SkillsServicesService {

  constructor(private _httpClient: HttpClient) { }
  getSkills(): Observable<any> {
  return this._httpClient.get(`${skillBaseUrl}/GetAll`);
  }
}


