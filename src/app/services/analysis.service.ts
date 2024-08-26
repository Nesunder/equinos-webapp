import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analysis } from '../../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private url: string = '/analysis';

  constructor(private apiService: ApiService) {
  }

  getAllAnalysis(): Observable<Analysis[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.apiService.get(this.url, { headers, responseType: 'json' });
  }
}
