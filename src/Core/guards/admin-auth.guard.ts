import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../Services/auth/auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return authService.tryRestoreSession().pipe(
    map((restored) => restored ? true : router.createUrlTree(['/admin/login'])),
    catchError(() => of(router.createUrlTree(['/admin/login'])))
  );
};
