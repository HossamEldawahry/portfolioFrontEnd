import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { projectBaseUrl } from '../../server/baseUrl';
import { IProject } from '../../Models/iproject';
import { IPagesResult } from '../../Models/ipages-result';
@Injectable({
  providedIn: 'root'
})
export class ProjectsServicesService {

  constructor(private _httpClient: HttpClient) { }
  getProjects(): Observable<any>
  {
    return this._httpClient.get(`${projectBaseUrl}/GetAll`);
  }
  getProjectById(id: number): Observable<any> {
    return this._httpClient.get(`${projectBaseUrl}/GetById/${id}`);
  }
  getProjectsPaginated(page: number, pageSize: number): Observable<IPagesResult<IProject>> {
  let params = new HttpParams()
    .set('page', page)
    .set('pageSize', pageSize);

  return this._httpClient.get<IPagesResult<IProject>>(`${projectBaseUrl}/paged`, { params });
}
}
