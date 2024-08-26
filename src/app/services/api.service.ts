import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl: string = 'http://localhost:8080/api'
  get<T>(url: string, options: any): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}${url}`, options) as Observable<T>
  }
}
