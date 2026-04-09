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

  createSkill(payload: Pick<ISkills, 'name' | 'level'>): Observable<ISkills> {
    return this._httpClient.post<ISkills>(this.skillsUrl, payload);
  }

  updateSkill(id: number, payload: Pick<ISkills, 'name' | 'level'>): Observable<void> {
    return this._httpClient.put<void>(`${this.skillsUrl}/${id}`, payload);
  }

  deleteSkill(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.skillsUrl}/${id}`);
  }
}


