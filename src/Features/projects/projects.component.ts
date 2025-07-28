import { Component, OnInit } from '@angular/core';
import { IProject } from '../../Core/Models/iproject';
import { ProjectsServicesService } from '../../Core/Services/projects/projects-services.service';
import { imageBaseUrl } from '../../Core/server/baseUrl';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [RouterModule],
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
      this.projects = res.items;
      this.totalCount = res.totalCount;
      this.totalPages = res.totalPages;
      for (let project of this.projects) {
        project.imageUrl = imageBaseUrl + project.imageUrl
      }
    },
    error: (err) => console.error('Error loading projects:', err)
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
