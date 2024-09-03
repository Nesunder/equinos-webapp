import { HttpClient, } from '@angular/common/http';
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

/**
 * Convierte un string base64 en un objeto File.
 * @param base64String - La imagen en formato base64.
 * @param fileName - El nombre del archivo que deseas crear.
 * @returns Un objeto File.
 */
export function base64ToFile(base64String: string, fileName: string): File {
  const byteString = atob(base64String.split(',')[1]);
  const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ab], fileName, { type: mimeString });
}