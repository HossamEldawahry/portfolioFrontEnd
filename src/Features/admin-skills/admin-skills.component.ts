import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ISkills } from '../../Core/Models/iskills';
import { SkillsServicesService } from '../../Core/Services/skills/skills-services.service';

@Component({
  selector: 'app-admin-skills',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.scss'
})
export class AdminSkillsComponent implements OnInit {
  skills: ISkills[] = [];
  selectedId: number | null = null;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    level: new FormControl(1, [Validators.required, Validators.min(0), Validators.max(5)])
  });

  constructor(private skillsService: SkillsServicesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillsService.getSkills().subscribe({
      next: (data) => (this.skills = data)
    });
  }

  edit(skill: ISkills): void {
    this.selectedId = skill.id;
    this.form.patchValue({ name: skill.name, level: skill.level });
  }

  resetForm(): void {
    this.selectedId = null;
    this.form.reset({ name: '', level: 1 });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as { name: string; level: number };
    if (this.selectedId) {
      this.skillsService.updateSkill(this.selectedId, payload).subscribe({
        next: () => {
          this.toastr.success('تم تعديل المهارة');
          this.loadSkills();
          this.resetForm();
        }
      });
      return;
    }

    this.skillsService.createSkill(payload).subscribe({
      next: () => {
        this.toastr.success('تمت إضافة المهارة');
        this.loadSkills();
        this.resetForm();
      }
    });
  }

  deleteSkill(id: number): void {
    this.skillsService.deleteSkill(id).subscribe({
      next: () => {
        this.toastr.success('تم حذف المهارة');
        this.loadSkills();
      }
    });
  }
}
