import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analysis, AnalysisDto } from '../../types';
import { ApiService } from './api.service';
import { base64ToFile } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private url: string = '/analysis';
  private token: string | null = '';
  private headers: HttpHeaders = new HttpHeaders;

  constructor(private apiService: ApiService) { }

  private getAuthorizationData() {
    this.token = localStorage.getItem('accessToken');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getAllAnalysis(): Observable<Analysis[]> {
    this.getAuthorizationData();
    return this.apiService.get(this.url, { headers: this.headers, responseType: 'json' });
  }

  getAnalysisImage(imageName: string): string{
    return this.apiService.getImage("analysis", imageName, true);
  }

  getHorseImage(imageName: string): string{ // TODO, creo esto no deberia ir aqui, quizas debamos tener un imageService con estos dos metodos y los llamamos de donde necesitemos
    return this.apiService.getImage("horses", imageName, true);
  }

  // Código repetido, refactorizar luego
  editAnalysis(analysis: Analysis, imageBase64: string): Observable<any> {
    this.getAuthorizationData()

    const analysisDto: AnalysisDto = {
      userId: analysis.user.userId,
      horseId: analysis.horse.id,
      interesado: analysis.predictionDetail.interesado,
      sereno: analysis.predictionDetail.sereno,
      disgustado: analysis.predictionDetail.disgustado,
      image: '',
      prediction: analysis.predictionDetail.prediction,
      observations: analysis.observations,
    }

    const formData: FormData = new FormData();
    formData.append('analysis', new Blob([JSON.stringify(analysisDto)], { type: 'application/json' }));
    formData.append('image', base64ToFile(imageBase64, 'imagen.jpeg'));

    return this.apiService.put(this.url, analysis.id, formData, { headers: this.headers, responseType: 'json' });
  }

  deleteAnalysis(analysisId: number): Observable<any> {
    this.getAuthorizationData()
    return this.apiService.delete(this.url, analysisId, { headers: this.headers, responseType: 'json' });

  }
}
