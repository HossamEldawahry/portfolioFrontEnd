import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProject } from '../../Core/Models/iproject';
import { ProjectsServicesService } from '../../Core/Services/projects/projects-services.service';
import { resolveApiMediaUrl } from '../../Core/server/baseUrl';

@Component({
  selector: 'app-admin-projects',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.scss'
})
export class AdminProjectsComponent implements OnInit, OnDestroy {
  @ViewChild('projectImageInput') projectImageInput?: ElementRef<HTMLInputElement>;

  projects: IProject[] = [];
  selectedId: number | null = null;
  selectedImageFile: File | null = null;
  /** Object URL for newly selected file (revoke on clear/destroy). */
  private uploadPreviewObjectUrl: string | null = null;
  /** Resolved URL for image already saved on the server when editing. */
  existingImageUrl: string | null = null;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(8000)]),
    gitHubUrl: new FormControl(''),
    demoUrl: new FormControl(''),
    isFeatured: new FormControl(false, { nonNullable: true })
  });

  constructor(private projectsService: ProjectsServicesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: (data) => (this.projects = data)
    });
  }

  ngOnDestroy(): void {
    this.revokeUploadPreview();
  }

  get formImageSrc(): string | null {
    if (this.uploadPreviewObjectUrl) {
      return this.uploadPreviewObjectUrl;
    }
    return this.existingImageUrl;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.revokeUploadPreview();
    this.selectedImageFile = file;
    if (file) {
      this.uploadPreviewObjectUrl = URL.createObjectURL(file);
    }
  }

  edit(project: IProject): void {
    this.revokeUploadPreview();
    this.selectedImageFile = null;
    this.clearFileInput();
    this.selectedId = project.id;
    this.existingImageUrl = resolveApiMediaUrl(project.imageUrl);
    this.form.patchValue({
      title: project.title,
      description: project.description,
      gitHubUrl: project.gitHubUrl ?? '',
      demoUrl: project.demoUrl ?? '',
      isFeatured: project.isFeatured
    });
  }

  resetForm(): void {
    this.selectedId = null;
    this.selectedImageFile = null;
    this.existingImageUrl = null;
    this.revokeUploadPreview();
    this.clearFileInput();
    this.form.reset({ title: '', description: '', gitHubUrl: '', demoUrl: '', isFeatured: false });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.toFormData();
    if (this.selectedId) {
      this.projectsService.updateProject(this.selectedId, formData).subscribe({
        next: () => {
          this.toastr.success('تم تعديل المشروع');
          this.loadProjects();
          this.resetForm();
        }
      });
      return;
    }

    this.projectsService.createProject(formData).subscribe({
      next: () => {
        this.toastr.success('تمت إضافة المشروع');
        this.loadProjects();
        this.resetForm();
      }
    });
  }

  deleteProject(id: number): void {
    this.projectsService.deleteProject(id).subscribe({
      next: () => {
        this.toastr.success('تم حذف المشروع');
        this.loadProjects();
      }
    });
  }

  private toFormData(): FormData {
    const formData = new FormData();
    const value = this.form.getRawValue();
    formData.append('title', value.title ?? '');
    formData.append('description', value.description ?? '');
    formData.append('gitHubUrl', value.gitHubUrl ?? '');
    formData.append('demoUrl', value.demoUrl ?? '');
    formData.append('isFeatured', String(value.isFeatured ?? false));
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
    return formData;
  }

  private revokeUploadPreview(): void {
    if (this.uploadPreviewObjectUrl) {
      URL.revokeObjectURL(this.uploadPreviewObjectUrl);
      this.uploadPreviewObjectUrl = null;
    }
  }

  private clearFileInput(): void {
    const el = this.projectImageInput?.nativeElement;
    if (el) {
      el.value = '';
    }
  }
}
