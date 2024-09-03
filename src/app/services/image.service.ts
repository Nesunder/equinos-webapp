import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private apiService: ApiService) { }

  getAnalysisImage(imageName: string): string {
    return this.apiService.getImage("analysis", imageName);
  }

  getCompressedAnalysisImage(imageName: string): string {
    return this.apiService.getImage("analysis", imageName, true);
  }

  getHorseImage(imageName: string): string {
    return this.apiService.getImage("horses", imageName);
  }

  getCompressedHorseImage(imageName: string): string {
    return this.apiService.getImage("horses", imageName, true);
  }
}
