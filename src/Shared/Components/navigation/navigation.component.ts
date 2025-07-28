import { NgClass } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  currentTheme: 'light' | 'dark' = 'dark';
  constructor(private renderer: Renderer2) {}
  toggleTheme() {
      const body = document.body;

      if (this.currentTheme === 'dark') {
        this.renderer.setAttribute(body, 'data-bs-theme', 'light');
        this.currentTheme = 'light';
      } else {
        this.renderer.setAttribute(body, 'data-bs-theme', 'dark');
        this.currentTheme = 'dark';
      }
    }
}
