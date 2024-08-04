import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(identificacion: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { identificacion, password });
  }

  storeUserData(data: any) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('idUsuario', data.idUsuario);
    localStorage.setItem('role', data.role);
    localStorage.setItem('email', data.email);
    localStorage.setItem('username', data.username);
  }
}
