import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkills } from '../../Models/iskills';
import { apiV1BaseUrl } from '../../server/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class SkillsServicesService {
  private readonly skillsUrl = `${apiV1BaseUrl}/skills`;

  constructor(private _httpClient: HttpClient) { }

  getSkills(): Observable<ISkills[]> {
    return this._httpClient.get<ISkills[]>(this.skillsUrl);
  }
}


