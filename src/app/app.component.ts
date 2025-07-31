import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'Hossam Mostafa | Portfolio';
  loading$ : Observable<boolean>;
  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}
