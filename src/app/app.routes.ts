import { Routes } from '@angular/router';

export const routes: Routes = [
  // Define your application routes here
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', loadComponent:() => import('../Features/home/home.component').then(c => c.HomeComponent) },
  { path: 'about', loadComponent:() => import('../Features/about/about.component').then(c => c.AboutComponent) },
  { path: 'projects', loadComponent:() => import('../Features/projects/projects.component').then(c => c.ProjectsComponent) },
  { path: 'contact', loadComponent:() => import('../Features/contact/contact.component').then(c => c.ContactComponent) },
  { path: 'skills', loadComponent:() => import('../Features/skills/skills.component').then(c => c.SkillsComponent) },
  { path: 'projects/:id', loadComponent:() => import('../Features/project-details/project-details.component').then(c => c.ProjectDetailsComponent) },
  { path: '**', loadComponent:() => import('../Features/not-found/not-found.component').then(c => c.NotFoundComponent) }

];
