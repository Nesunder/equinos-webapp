import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl: string = 'https://equinosapp-api-production.up.railway.app/api'

  post<T>(url: string, body: any, options: any): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}${url}`, body, options) as Observable<T>;
  }
  get<T>(url: string, options: any): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}${url}`, options) as Observable<T>
  }

  put<T>(url: string, id: number, body: FormData, options: any): Observable<T> {
    return this.httpClient.put<T>(`${this.apiUrl}${url}/${id}`, body, options) as Observable<T>;
  }

  delete<T>(url: string, id: number, options: any): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiUrl}${url}/${id}`, options) as Observable<T>;
  }

  getImage(path: string, imageName: string, compressed: boolean = false): string {
    const fileName = compressed ? `compressed_${imageName}` : imageName;
    return `${this.apiUrl}/images/${path}/${fileName}`;
  }
}