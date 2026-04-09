import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProfile } from '../../Core/Models/iprofile';
import { ProfileServiceService } from '../../Core/Services/profile/profile-service.service';
import { resolveApiMediaUrl } from '../../Core/server/baseUrl';

@Component({
  selector: 'app-admin-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent implements OnInit, OnDestroy {
  @ViewChild('profileImageInput') profileImageInput?: ElementRef<HTMLInputElement>;

  profile?: IProfile;
  selectedImageFile: File | null = null;
  private uploadPreviewObjectUrl: string | null = null;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    bio: new FormControl('', [Validators.required]),
    linkedInUrl: new FormControl(''),
    gitHubUrl: new FormControl('')
  });

  constructor(private profileService: ProfileServiceService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  ngOnDestroy(): void {
    this.revokeUploadPreview();
  }

  get formImageSrc(): string | null {
    if (this.uploadPreviewObjectUrl) {
      return this.uploadPreviewObjectUrl;
    }
    return resolveApiMediaUrl(this.profile?.imageUrl);
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.form.patchValue({
          name: data.name,
          title: data.title,
          email: data.email,
          bio: data.bio,
          linkedInUrl: data.linkedInUrl ?? '',
          gitHubUrl: data.gitHubUrl ?? ''
        });
      }
    });
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

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const value = this.form.getRawValue();
    formData.append('name', value.name ?? '');
    formData.append('title', value.title ?? '');
    formData.append('email', value.email ?? '');
    formData.append('bio', value.bio ?? '');
    formData.append('linkedInUrl', value.linkedInUrl ?? '');
    formData.append('gitHubUrl', value.gitHubUrl ?? '');
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    if (this.profile?.id) {
      this.profileService.updateProfile(this.profile.id, formData).subscribe({
        next: () => {
          this.toastr.success('تم تحديث الملف الشخصي');
          this.clearImageSelectionAfterSave();
          this.loadProfile();
        }
      });
      return;
    }

    this.profileService.createProfile(formData).subscribe({
      next: () => {
        this.toastr.success('تم إنشاء الملف الشخصي');
        this.clearImageSelectionAfterSave();
        this.loadProfile();
      }
    });
  }

  private revokeUploadPreview(): void {
    if (this.uploadPreviewObjectUrl) {
      URL.revokeObjectURL(this.uploadPreviewObjectUrl);
      this.uploadPreviewObjectUrl = null;
    }
  }

  private clearImageSelectionAfterSave(): void {
    this.selectedImageFile = null;
    this.revokeUploadPreview();
    const el = this.profileImageInput?.nativeElement;
    if (el) {
      el.value = '';
    }
  }
}
