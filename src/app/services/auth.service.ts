import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://equinosapp-api-production.up.railway.app/api/auth';

  constructor(private http: HttpClient) { }

  login(identification: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { identification, password });
  }
  
  createUser(username: string, email: string, password: string, advancedUser: boolean) {
    let url: string = `${this.apiUrl}/register`
    if (advancedUser) {
      url += 'Advanced'
    }
    return this.http.post<any>(url, { username, email, password });
  }

  storeUserData(data: any) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('role', data.role);
    localStorage.setItem('email', data.email);
    localStorage.setItem('username', data.username);
    localStorage.setItem('image', data.image)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
