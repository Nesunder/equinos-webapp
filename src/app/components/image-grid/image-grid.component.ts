import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageUploadComponent } from "../image-upload/image-upload.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageModule } from 'primeng/image';
import { AnalysisComponent } from "../analysis/analysis.component";
import { Analysis } from '../../../types';
import { AnalysisService } from '../../services/analysis.service';
import { ImageService } from '../../services/image.service';


@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [NgFor, ImageUploadComponent, MatGridListModule, ImageModule, AnalysisComponent],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.css'
})
export class ImageGridComponent implements OnInit {

  analyses: Analysis[] = []

  constructor(private analysisService: AnalysisService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getAllAnalysis()
  }

  getAllAnalysis() {
    this.analysisService.getAllAnalysis()
      .subscribe({
        next: response => {
          this.analyses = response.map(analysis => {
            return {
              ...analysis,
              image: this.imageService.getCompressedAnalysisImage(analysis.image),
              horse: {
                ...analysis.horse,
                image: this.imageService.getCompressedHorseImage(analysis.horse?.image || '')
              },
              fullImage: this.imageService.getAnalysisImage(analysis.image),
            };
          });
          console.log('Respuesta del servidor modificada:', this.analyses);
        },
        error: error => {
          console.error('Error al obtener los análisis', error);
        }
      });
  }
}
