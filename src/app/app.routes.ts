import { Routes } from '@angular/router';
import { adminAuthGuard } from '../Core/guards/admin-auth.guard';

export const routes: Routes = [
  { path: '', loadComponent:() => import('../Features/home/home.component').then(c => c.HomeComponent) },
  { path: 'about', loadComponent:() => import('../Features/about/about.component').then(c => c.AboutComponent) },
  { path: 'projects', loadComponent:() => import('../Features/projects/projects.component').then(c => c.ProjectsComponent) },
  { path: 'contact', loadComponent:() => import('../Features/contact/contact.component').then(c => c.ContactComponent) },
  { path: 'skills', loadComponent:() => import('../Features/skills/skills.component').then(c => c.SkillsComponent) },
  { path: 'projects/:id', loadComponent:() => import('../Features/project-details/project-details.component').then(c => c.ProjectDetailsComponent) },
  { path: 'admin/login', loadComponent:() => import('../Features/admin-login/admin-login.component').then(c => c.AdminLoginComponent) },
  { path: 'admin/dashboard', canActivate: [adminAuthGuard], loadComponent:() => import('../Features/admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent) },
  { path: 'admin/projects', canActivate: [adminAuthGuard], loadComponent:() => import('../Features/admin-projects/admin-projects.component').then(c => c.AdminProjectsComponent) },
  { path: 'admin/skills', canActivate: [adminAuthGuard], loadComponent:() => import('../Features/admin-skills/admin-skills.component').then(c => c.AdminSkillsComponent) },
  { path: 'admin/messages', canActivate: [adminAuthGuard], loadComponent:() => import('../Features/admin-messages/admin-messages.component').then(c => c.AdminMessagesComponent) },
  { path: 'admin/profile', canActivate: [adminAuthGuard], loadComponent:() => import('../Features/admin-profile/admin-profile.component').then(c => c.AdminProfileComponent) },
  { path: '**', loadComponent:() => import('../Features/not-found/not-found.component').then(c => c.NotFoundComponent) }

];
