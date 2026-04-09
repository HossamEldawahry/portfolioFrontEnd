import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();

  const request = addAuthHeader(req, accessToken);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');
      if (error.status !== 401 || isAuthRequest || isRefreshing) {
        return throwError(() => error);
      }

      isRefreshing = true;
      return authService.refreshToken().pipe(
        switchMap((authResponse) => {
          isRefreshing = false;
          const retryReq = addAuthHeader(req, authResponse.accessToken);
          return next(retryReq);
        }),
        catchError((refreshError) => {
          isRefreshing = false;
          authService.localLogout();
          router.navigateByUrl('/admin/login');
          return throwError(() => refreshError);
        })
      );
    })
  );
};

function addAuthHeader(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  if (!token) {
    return req;
  }

  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
