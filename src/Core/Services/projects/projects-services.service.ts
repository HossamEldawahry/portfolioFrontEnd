import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../../Models/iproject';
import { IPagesResult } from '../../Models/ipages-result';
import { apiV1BaseUrl } from '../../server/baseUrl';
@Injectable({
  providedIn: 'root'
})
export class ProjectsServicesService {
  private readonly projectsUrl = `${apiV1BaseUrl}/projects`;

  constructor(private _httpClient: HttpClient) { }
  getProjects(): Observable<IProject[]> {
    return this._httpClient.get<IProject[]>(this.projectsUrl);
  }

  getProjectById(id: number): Observable<IProject> {
    return this._httpClient.get<IProject>(`${this.projectsUrl}/${id}`);
  }

  getFeaturedProjects(take = 6): Observable<IProject[]> {
    const params = new HttpParams().set('take', take);
    return this._httpClient.get<IProject[]>(`${this.projectsUrl}/featured`, { params });
  }

  getProjectsPaginated(page: number, pageSize: number): Observable<IPagesResult<IProject>> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this._httpClient.get<IPagesResult<IProject>>(`${this.projectsUrl}/paged`, { params });
  }

  createProject(formData: FormData): Observable<IProject> {
    return this._httpClient.post<IProject>(this.projectsUrl, formData);
  }

  updateProject(id: number, formData: FormData): Observable<void> {
    return this._httpClient.put<void>(`${this.projectsUrl}/${id}`, formData);
  }

  deleteProject(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.projectsUrl}/${id}`);
  }
}
