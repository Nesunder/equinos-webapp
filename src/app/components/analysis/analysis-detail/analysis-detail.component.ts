import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Analysis, Horse, PredictionEnum } from '../../../../types';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AnalysisService } from '../../../services/analysis.service';
import { HorseDataComponent } from "../../horse-grid/horse-data/horse-data.component";
import { Subject } from 'rxjs';
import { HorseService } from '../../../services/horse.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-analysis-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    HorseDataComponent
  ],
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.css'],
})
export class AnalysisDetailComponent implements OnInit {
  isEditingHorse = false;
  isEditingObservations = false;
  observationsForm: FormGroup;
  formatedDate: string = ''
  analysisData!: Analysis;
  horseImgUrl: string = ''
  originalHorseData: Horse | null = null;
  analysisImgUrl: string = '';
  dataSubject = new Subject<any>();
  largestList: string = '';
  horseData: Horse | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private analysisService: AnalysisService, private horseService: HorseService,
    private themeService: ThemeService
  ) {
    this.observationsForm = this.fb.group({
      observations: ['']
    })
  }
  ngOnInit(): void {
    this.analysisData = this.data.analysisData;
    this.horseImgUrl = this.data.horseImgUrl;
    this.analysisImgUrl = this.data.analysisImgUrl;
    this.getMostRepeatedTag();
    this.observationsForm.patchValue({ observations: this.analysisData.observations });
    this.horseData = this.analysisData.horse
    this.horseData.sexo = this.horseService.mapGenderToSexo(this.horseData.sexo)

    if (this.analysisData.horse) {
      this.originalHorseData = { ...this.analysisData.horse };
    }
  }

  getMostRepeatedTag() {
    const serenoList = this.analysisData.SERENO.length;
    const interesadoList = this.analysisData.INTERESADO.length;
    const disgustadoList = this.analysisData.DISGUSTADO.length;

    // Find the largest size
    const largestSize = Math.max(serenoList, interesadoList, disgustadoList);
    if (largestSize === serenoList) {
      this.largestList = 'Sereno';
    } else if (largestSize === interesadoList) {
      this.largestList = 'Interesado';
    } else {
      this.largestList = 'Disgustado';
    }
  }

  getPredictionIcon(prediction: PredictionEnum): string {
    if (!prediction) return 'help';
    switch (prediction) {
      case PredictionEnum.INTERESADO:
        return 'sentiment_satisfied';
      case PredictionEnum.SERENO:
        return 'sentiment_neutral';
      case PredictionEnum.DISGUSTADO:
        return 'sentiment_dissatisfied';
      default:
        return 'help';
    }
  }

  toggleEditObservations(): void {
    const userRole = localStorage.getItem('role');
    if (userRole === 'USER') {
      this.themeService.showErrorAlert('', 'Error al editar el análisis, debe tener permisos de usuario avanzado');
      return;
    }

    if (this.isEditingObservations) {
      this.saveObservations();
    }
    this.isEditingObservations = !this.isEditingObservations;
  }

  saveObservations() {
    if (this.observationsForm.valid && this.observationsForm.value.observations !== this.analysisData.observations) {
      this.analysisData.observations = this.observationsForm.value.observations;
      this.editAnalysis()
    }
  }

  editAnalysis() {
    this.analysisService.editAnalysis(this.analysisData).subscribe({
      next: response => {
        console.log('Se editó el análsis', response);
        this.originalHorseData = this.analysisData.horse
        this.notifyRefresh();   
        this.themeService.showSuccesToast('Se modificó el análisis!');
      },
      error: error => {
        console.error('Error al editar el análisis', error)
        this.themeService.showErrorAlert('Error!', 'Error al editar el análisis, debe tener permisos de usuario avanzado');
      }
    });
  }

  notifyRefresh() {
    const resultData = { update: true };
    this.dataSubject.next(resultData);  
  }
}