import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../../Core/Services/profile/profile-service.service';
import { IProfile } from '../../Core/Models/iprofile';
import { resolveApiMediaUrl } from '../../Core/server/baseUrl';
import { ProjectsServicesService } from '../../Core/Services/projects/projects-services.service';
import { IProject } from '../../Core/Models/iproject';
import { StatsService } from '../../Core/Services/stats/stats.service';
import { IPortfolioStats } from '../../Core/Models/portfolio-stats';
import { SkillsServicesService } from '../../Core/Services/skills/skills-services.service';
import { ISkills } from '../../Core/Models/iskills';
import { RouterModule } from '@angular/router';
import { CommonModule, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  profile?: IProfile;
  featuredProjects: IProject[] = [];
  skills: ISkills[] = [];
  stats?: IPortfolioStats;

  constructor(
    private profileService: ProfileServiceService,
    private projectsService: ProjectsServicesService,
    private statsService: StatsService,
    private skillsService: SkillsServicesService
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        if (this.profile.imageUrl) {
          this.profile.imageUrl = resolveApiMediaUrl(this.profile.imageUrl) ?? this.profile.imageUrl;
        }
      }
    });

    this.projectsService.getFeaturedProjects(3).subscribe({
      next: (projects) => {
        this.featuredProjects = projects.map((project) => ({
          ...project,
          imageUrl: project.imageUrl ? resolveApiMediaUrl(project.imageUrl) : null
        }));
      }
    });

    this.skillsService.getSkills().subscribe({
      next: (skills) => (this.skills = skills)
    });

    this.statsService.getStats().subscribe({
      next: (stats) => (this.stats = stats)
    });
  }

  getSkillPercent(level: number): number {
    return Math.max(0, Math.min(5, level)) * 20;
  }

  getSkillIcon(level: number): string {
    if (level >= 5) return 'bi-stars';
    if (level >= 4) return 'bi-award';
    if (level >= 3) return 'bi-lightning-charge';
    if (level >= 2) return 'bi-code-slash';
    return 'bi-person-workspace';
  }

  getSkillLabel(level: number): string {
    if (level >= 5) return 'خبير';
    if (level >= 4) return 'متقدم';
    if (level >= 3) return 'متوسط';
    if (level >= 2) return 'فوق المبتدئ';
    return 'مبتدئ';
  }

  /** رابط تحميل السيرة من الـ API فقط (لا يوجد ملف static) */
  get resumeDownloadHref(): string | null {
    return resolveApiMediaUrl(this.profile?.resumeUrl);
  }
}
