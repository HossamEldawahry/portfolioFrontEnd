import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../../Core/Services/profile/profile-service.service';
import { IProfile } from '../../Core/Models/iprofile';
import { apiBaseUrl } from '../../Core/server/baseUrl';
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
          this.profile.imageUrl = `${apiBaseUrl}${this.profile.imageUrl}`;
        }
      }
    });

    this.projectsService.getFeaturedProjects(3).subscribe({
      next: (projects) => {
        this.featuredProjects = projects.map((project) => ({
          ...project,
          imageUrl: project.imageUrl ? `${apiBaseUrl}${project.imageUrl}` : null
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
}
