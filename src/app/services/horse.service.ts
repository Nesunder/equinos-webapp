import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, base64ToFile } from './api.service';
import { Horse, HorseDto } from '../../types';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorseService {
  private url: string = '/horses';

  constructor(private apiService: ApiService) { }

  editHorse(horse: Horse, imageBase64: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Token de autenticación no encontrado.');
      return throwError('Token de autenticación no encontrado.');
    }

    const horseDto: HorseDto = {
      id: horse.id,
      name: horse.name,
      gender: horse.sexo,
      dateOfBirth: horse.dateOfBirth,
      entrenamiento: horse.entrenamiento,
      estabulacion: horse.estabulacion,
      salidaAPiquete: horse.salidaAPiquete,
      dolor: horse.dolor,
      image: horse.image,
      observations: horse.observations,
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData: FormData = new FormData();
    formData.append('horse', new Blob([JSON.stringify(horseDto)], { type: 'application/json' }));
    formData.append('image', base64ToFile(imageBase64, 'imagen.jpeg'));

    return this.apiService.put(this.url, horse.id, formData, { headers, responseType: 'json' });
  }
}
