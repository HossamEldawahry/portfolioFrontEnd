import { NgClass } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  currentTheme: 'light' | 'dark' = 'dark';
  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.currentTheme = savedTheme;
    }
  }
  toggleTheme() {
      const body = document.body;

      if (this.currentTheme === 'dark') {
        this.renderer.setAttribute(body, 'data-bs-theme', 'light');
        this.currentTheme = 'light';
        localStorage.setItem('theme', 'light');
      } else {
        this.renderer.setAttribute(body, 'data-bs-theme', 'dark');
        this.currentTheme = 'dark';
        localStorage.setItem('theme', 'dark');
      }
    }
}
