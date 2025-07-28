import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsServicesService } from '../../Core/Services/projects/projects-services.service';
import { IProject } from '../../Core/Models/iproject';
import { imageBaseUrl } from '../../Core/server/baseUrl';

@Component({
  selector: 'app-project-details',
  imports: [],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: number;
  project: IProject | undefined;

  constructor(private _projectService: ProjectsServicesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      this.getProjectDetails(this.projectId);
    });
  }

  getProjectDetails(id: number) {
    this._projectService.getProjectById(id).subscribe(data => {
      this.project = data;
      // Ensure the imageUrl is prefixed with the base URL
      if (this.project?.imageUrl)
        this.project.imageUrl = imageBaseUrl + this.project.imageUrl;
    });
  }
}
