import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Core/Services/auth/auth.service';
import { StatsService } from '../../Core/Services/stats/stats.service';
import { IPortfolioStats } from '../../Core/Models/portfolio-stats';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  stats?: IPortfolioStats;

  constructor(
    private statsService: StatsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.statsService.getStats().subscribe({
      next: (data) => (this.stats = data)
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/admin/login'),
      error: () => {
        this.authService.localLogout();
        this.router.navigateByUrl('/admin/login');
      }
    });
  }
}
