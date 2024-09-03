import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Horse, HorseDto } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorseService {
  private url: string = '/horses';
  private token: string | null = '';
  private headers: HttpHeaders = new HttpHeaders;

  constructor(private apiService: ApiService) { }

  private getAuthorizationData() {
    this.token = localStorage.getItem('accessToken');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getHorses(): Observable<HorseDto[]> {
    this.getAuthorizationData();
    return this.apiService.get(`${this.url}`, { headers: this.headers, responseType: 'json' });
  }

  editHorse(horse: Horse): Observable<any> {
    this.getAuthorizationData();

    const horseDto: HorseDto = {
      id: horse.id,
      name: horse.name,
      gender: horse.sexo,
      dateOfBirth: horse.dateOfBirth,
      entrenamiento: horse.entrenamiento,
      estabulacion: horse.estabulacion,
      salidaAPiquete: horse.salidaAPiquete,
      dolor: horse.dolor,
      observations: horse.observations,
    }

    const formData: FormData = new FormData();
    formData.append('horse', new Blob([JSON.stringify(horseDto)], { type: 'application/json' }));

    return this.apiService.put(this.url, horse.id, formData, { headers: this.headers, responseType: 'json' });
  }

  deleteHorse(horseId: number): Observable<any> {
    this.getAuthorizationData()
    return this.apiService.delete(this.url, horseId, { headers: this.headers, responseType: 'json' });
  }
}
