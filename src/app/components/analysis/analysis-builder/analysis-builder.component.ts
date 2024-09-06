import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AnalysisDto, HorseDto, PredictionEnum } from '../../../../types';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HorseSelectorComponent } from "../../horse-selector/horse-selector.component";
import { AnalysisService } from '../../../services/analysis.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analysis-builder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ScrollingModule,
    HorseSelectorComponent,
    MatSnackBarModule
  ],
  templateUrl: './analysis-builder.component.html',
  styleUrl: './analysis-builder.component.css'
})
export class AnalysisBuilderComponent implements OnInit {
  analysisForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  predictionOptions = Object.values(PredictionEnum);
  imageFile: File | undefined;


  constructor(private fb: FormBuilder, private analysisService: AnalysisService,
    private notificationService: NotificationService) {
    this.analysisForm = this.fb.group({
      horseId: [null, Validators.required],
      image: ['', Validators.required],
      observations: [''],
      predictionDetail: this.fb.group({
        interesado: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
        sereno: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
        disgustado: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
        prediction: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void { }

  resetForm() {
    this.analysisForm = this.fb.group({
      horseId: [null, Validators.required],
      image: ['', Validators.required],
      observations: [''],
      predictionDetail: this.fb.group({
        interesado: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
        sereno: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
        disgustado: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
        prediction: ['', Validators.required]
      })
    });
  }

  onFileSelected(event: Event): void {
    this.imageFile = (event.target as HTMLInputElement).files?.[0];
    if (this.imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.analysisForm.patchValue({ image: reader.result as string });
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  onHorseSelected(horse: HorseDto): void {
    this.analysisForm.patchValue({ horseId: horse.id });
  }

  onSubmit(): void {
    const userIdString = localStorage.getItem('userId');
    var userId = userIdString ? parseInt(userIdString) : -1

    if (this.analysisForm.valid) {
      const formValue = this.analysisForm.value;
      const analysis: AnalysisDto = {
        userId: userId,
        horseId: formValue.horseId,
        interesado: formValue.predictionDetail.interesado,
        sereno: formValue.predictionDetail.sereno,
        disgustado: formValue.predictionDetail.disgustado,
        prediction: formValue.predictionDetail.prediction,
        observations: formValue.observations
      };
      console.log('Analysis to submit:', analysis);
      this.createAnalysis(analysis)
    }
  }

  createAnalysis(analysis: AnalysisDto) {
    this.analysisService.createAnalysis(analysis, this.imageFile!).subscribe({
      next: response => {
        if (response.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * response.loaded / response.total);
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (response instanceof HttpResponse) {
          this.notificationService.showSuccess('Se creó el análisis!');
          console.log('Se creó el análsis', response);
          this.imagePreview = null
          this.resetForm();
        }
      },
      error: error => {
        console.error('Error al crear el análisis', error);
        this.notificationService.showError('Error en la creación del análisis');
      }
    });
  }
}