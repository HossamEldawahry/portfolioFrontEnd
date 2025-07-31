import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../Shared/Components/navigation/navigation.component';
import { FooterComponent } from '../Shared/Components/footer/footer.component';
import { LoadingService } from '../Core/Services/loading/loading.service';
import { Observable } from 'rxjs';
import { LoadingComponent } from '../Shared/Components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent,FooterComponent,LoadingComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'Hossam Mostafa | Portfolio';
  loading$ : Observable<boolean>;
  currentTheme: string = '';
  constructor(private loadingService: LoadingService, private renderer: Renderer2) {
    this.loading$ = this.loadingService.loading$;
  }
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.renderer.setAttribute(document.body, 'data-bs-theme', this.currentTheme);
    }
  }
}
