import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProfile } from '../../Models/iprofile';
import { apiV1BaseUrl } from '../../server/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private readonly profileUrl = `${apiV1BaseUrl}/profile`;

  constructor(private _httpClient: HttpClient) { }

  /** يوحّد الحقول لو الـ API رجّع PascalCase */
  private normalizeProfile(raw: IProfile & Record<string, unknown>): IProfile {
    const resumeUrl =
      raw.resumeUrl ??
      (typeof raw['ResumeUrl'] === 'string' ? (raw['ResumeUrl'] as string) : null) ??
      null;
    const imageUrl =
      raw.imageUrl ??
      (typeof raw['ImageUrl'] === 'string' ? (raw['ImageUrl'] as string) : null) ??
      null;
    return { ...raw, resumeUrl, imageUrl };
  }

  getProfile(): Observable<IProfile> {
    return this._httpClient
      .get<IProfile & Record<string, unknown>>(`${this.profileUrl}/current`)
      .pipe(map((r) => this.normalizeProfile(r)));
  }

  createProfile(formData: FormData): Observable<IProfile> {
    return this._httpClient
      .post<IProfile & Record<string, unknown>>(this.profileUrl, formData)
      .pipe(map((r) => this.normalizeProfile(r)));
  }

  updateProfile(id: number, formData: FormData): Observable<void> {
    return this._httpClient.put<void>(`${this.profileUrl}/${id}`, formData);
  }
}
