import { Component, OnInit } from '@angular/core';
import { ISkills } from '../../Core/Models/iskills';
import { SkillsLevel } from '../../Core/enum/skills-level';
import { SkillsServicesService } from '../../Core/Services/skills/skills-services.service';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  skills: ISkills[] = [];
  SkillsLevel = SkillsLevel;
  constructor(private _skillsService: SkillsServicesService) {}
  ngOnInit(): void {
    this.getSkills();
  }
  getSkills(): void {
    this._skillsService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
      },
      error: (err) => {
        console.error('Error fetching skills:', err);
      }
    });
  }
   getLevelName(level: number): string {
    switch (level) {
      case SkillsLevel.Starter: return 'مبتدئ';
      case SkillsLevel.Beginner: return 'هاوى';
      case SkillsLevel.Intermediate: return 'متوسط';
      case SkillsLevel.Advanced: return 'متقدم';
      case SkillsLevel.Expert: return 'خبير';
      case SkillsLevel.Master: return 'محترف';
      default: return 'غير معروف';
    }
  }

  getProgressPercent(level: number): number {
    return (level / 5) * 100;
  }

  getProgressClass(level: number): string {
    if (level >= 5) return 'bg-success';
    if (level >= 4) return 'bg-primary';
    if (level >= 3) return 'bg-info';
    if (level >= 2) return 'bg-warning';
    return 'bg-danger';
  }

  getLevelIcon(level: number): string {
    switch (level) {
      case 0: return 'bi-person-circle';
      case 1: return 'bi-person';
      case 2: return 'bi-person-fill';
      case 3: return 'bi-lightbulb';
      case 4: return 'bi-award';
      case 5: return 'bi-star-fill';
      default: return 'bi-question-circle';
    }
  }
}
