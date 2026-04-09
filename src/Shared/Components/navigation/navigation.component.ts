import { NgClass } from '@angular/common';
import { Component, DestroyRef, OnInit, Renderer2, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../Core/Services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  currentTheme: 'light' | 'dark' = 'dark';
  isLoggedIn = false;

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.currentTheme = savedTheme;
    }

    this.isLoggedIn = this.authService.isAuthenticated() || this.authService.hasRefreshToken();
    this.authService.getAccessTokenChanges()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((token) => {
        this.isLoggedIn = !!token || this.authService.hasRefreshToken();
      });

    this.authService.tryRestoreSession().subscribe({
      next: (restored) => {
        this.isLoggedIn = restored;
      }
    });
  }

  toggleTheme() {
      const body = document.body;

      if (this.currentTheme === 'dark') {
        this.renderer.setAttribute(body, 'data-bs-theme', 'light');
        this.currentTheme = 'light';
        localStorage.setItem('theme', 'light');
      } else {
        this.renderer.setAttribute(body, 'data-bs-theme', 'dark');
        this.currentTheme = 'dark';
        localStorage.setItem('theme', 'dark');
      }
    }

  goToDashboard(): void {
    this.router.navigateByUrl('/admin/dashboard');
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.router.navigateByUrl('/admin/login');
      },
      error: () => {
        this.authService.localLogout();
        this.isLoggedIn = false;
        this.router.navigateByUrl('/admin/login');
      }
    });
  }
}
