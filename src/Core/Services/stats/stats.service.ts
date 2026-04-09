import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPortfolioStats } from '../../Models/portfolio-stats';
import { apiV1BaseUrl } from '../../server/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly statsUrl = `${apiV1BaseUrl}/stats`;

  constructor(private httpClient: HttpClient) {}

  getStats(): Observable<IPortfolioStats> {
    return this.httpClient.get<IPortfolioStats>(this.statsUrl);
  }
}
