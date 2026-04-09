import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProject } from '../../Core/Models/iproject';
import { ProjectsServicesService } from '../../Core/Services/projects/projects-services.service';
import { resolveApiMediaUrl } from '../../Core/server/baseUrl';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [RouterModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit{
projects: IProject[] = [];
page = 1;
pageSize = 5;
totalPages = 0;
totalCount = 0;
constructor(private _projectService: ProjectsServicesService) {
}
loadProjects(): void {
  this._projectService.getProjectsPaginated(this.page, this.pageSize).subscribe({
    next: (res) => {
      this.projects = res.items.map((project) => ({
        ...project,
        imageUrl: project.imageUrl ? resolveApiMediaUrl(project.imageUrl) : null
      }));
      this.totalCount = res.totalCount;
      this.totalPages = res.totalPages;
    }
  });
}
ngOnInit(): void {
  this.loadProjects();
}
nextPage(): void {
  if (this.page < this.totalPages) {
    this.page++;
    this.loadProjects();
  }
}
prevPage(): void {
  if (this.page > 1) {
    this.page--;
    this.loadProjects();
  }
}
}
