import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { IAuthResponse, ILoginRequest } from '../../Models/auth';
import { apiV1BaseUrl } from '../../server/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = `${apiV1BaseUrl}/auth`;
  private readonly refreshTokenKey = 'portfolio_refresh_token';
  private accessToken$ = new BehaviorSubject<string | null>(null);

  constructor(private httpClient: HttpClient) {
    this.restoreSession();
  }

  login(payload: ILoginRequest): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${this.authUrl}/login`, payload).pipe(
      tap((result) => this.setSession(result))
    );
  }

  refreshToken(): Observable<IAuthResponse> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token found'));
    }
    return this.httpClient
      .post<IAuthResponse>(`${this.authUrl}/refresh`, { refreshToken })
      .pipe(tap((result) => this.setSession(result)));
  }

  logout(): Observable<void> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      this.clearSession();
      return of(void 0);
    }

    return this.httpClient.post<void>(`${this.authUrl}/logout`, { refreshToken }).pipe(
      tap(() => this.clearSession())
    );
  }

  localLogout(): void {
    this.clearSession();
  }

  getAccessToken(): string | null {
    return this.accessToken$.value;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  hasRefreshToken(): boolean {
    return !!localStorage.getItem(this.refreshTokenKey);
  }

  tryRestoreSession(): Observable<boolean> {
    if (this.isAuthenticated()) {
      return of(true);
    }

    if (!this.hasRefreshToken()) {
      return of(false);
    }

    return this.refreshToken().pipe(
      map(() => true),
      catchError(() => {
        this.clearSession();
        return of(false);
      })
    );
  }

  getAccessTokenChanges(): Observable<string | null> {
    return this.accessToken$.asObservable();
  }

  private setSession(authResponse: IAuthResponse): void {
    this.accessToken$.next(authResponse.accessToken);
    localStorage.setItem(this.refreshTokenKey, authResponse.refreshToken);
  }

  private restoreSession(): void {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      this.accessToken$.next(null);
    }
  }

  private clearSession(): void {
    this.accessToken$.next(null);
    localStorage.removeItem(this.refreshTokenKey);
  }
}
