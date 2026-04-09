import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProfile } from '../../Core/Models/iprofile';
import { ProfileServiceService } from '../../Core/Services/profile/profile-service.service';

@Component({
  selector: 'app-admin-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent implements OnInit {
  profile?: IProfile;
  selectedImageFile: File | null = null;

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
    this.selectedImageFile = input.files?.[0] ?? null;
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
        next: () => this.toastr.success('تم تحديث الملف الشخصي')
      });
      return;
    }

    this.profileService.createProfile(formData).subscribe({
      next: () => {
        this.toastr.success('تم إنشاء الملف الشخصي');
        this.loadProfile();
      }
    });
  }
}
