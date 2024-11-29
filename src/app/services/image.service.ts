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

  getCompressedUserImage(imageName: string): string {
    return this.apiService.getImage("users", imageName, true);
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