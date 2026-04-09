import { NgClass } from '@angular/common';
import { Component, DestroyRef, HostListener, OnInit, Renderer2, inject } from '@angular/core';
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
  /** Bootstrap dropdown JS غير موثوق مع Angular؛ نفتح/نغلق يدويًا */
  userMenuOpen = false;

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu-root')) {
      this.userMenuOpen = false;
    }
  }

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeUserMenu(): void {
    this.userMenuOpen = false;
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

  logout(): void {
    this.closeUserMenu();
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
