import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Analysis, Horse, PredictionEnum } from '../../../../types';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import moment from 'moment';
import { HorseService } from '../../../services/horse.service';
import { AnalysisService } from '../../../services/analysis.service';


const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-analysis-detail',
  standalone: true,
  providers: [DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-AR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.css'],
})
export class AnalysisDetailComponent implements OnInit {
  horseForm: FormGroup;
  isEditingHorse = false;
  isEditingObservations = false;
  observationsForm: FormGroup;
  formatedDate: string = ''
  analysisData!: Analysis;
  horseImgUrl: string = ''
  originalHorseData: Horse | null = null;
  analysisImgUrl: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private horseService: HorseService,
    private analysisService: AnalysisService
  ) {
    this.horseForm = this.fb.group({
      name: [''],
      dateOfBirth: [''],
      sexo: [''],
      entrenamiento: [false],
      estabulacion: [false],
      dolor: [false],
      salidaAPiquete: [false],
      observations: ['']
    });

    this.observationsForm = this.fb.group({
      observations: ['']
    })
  }
  ngOnInit(): void {
    this.analysisData = this.data.analysisData;
    this.horseImgUrl = this.data.horseImgUrl;
    this.analysisImgUrl = this.data.analysisImgUrl;

    if (this.analysisData.horse) {
      this.originalHorseData = { ...this.analysisData.horse };
      this.formatedDate = this.analysisData.horse.dateOfBirth;
      const dateOfBirth = moment(this.formatedDate, 'DD-MM-YYYY');

      this.horseForm.patchValue({
        ...this.analysisData.horse,
        dateOfBirth: dateOfBirth
      });
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

  toggleEditHorse(): void {
    if (this.isEditingHorse) {
      this.saveHorseDetails();
    }
    this.isEditingHorse = !this.isEditingHorse;
  }

  saveHorseDetails(): void {
    if (this.horseForm.valid) {
      const formValue = this.horseForm.value;
      const updatedHorse: Horse = {
        ...this.analysisData.horse,
        ...formValue,
        dateOfBirth: this.formatedDate
      };
      if (this.hasHorseDataChanged(updatedHorse)) {
        this.analysisData.horse = updatedHorse;
        this.editHorse();
      } else {
        console.log('No changes detected in horse details');
      }
    }
  }

  hasHorseDataChanged(updatedHorse: Horse): boolean {
    if (!this.originalHorseData) return false;

    return (
      updatedHorse.name !== this.originalHorseData.name ||
      updatedHorse.dateOfBirth !== this.originalHorseData.dateOfBirth ||
      updatedHorse.sexo !== this.originalHorseData.sexo ||
      updatedHorse.entrenamiento !== this.originalHorseData.entrenamiento ||
      updatedHorse.estabulacion !== this.originalHorseData.estabulacion ||
      updatedHorse.dolor !== this.originalHorseData.dolor ||
      updatedHorse.salidaAPiquete !== this.originalHorseData.salidaAPiquete ||
      updatedHorse.observations !== this.originalHorseData.observations
    );
  }

  editHorse() {
    this.horseService.editHorse(this.analysisData.horse, this.horseImgUrl).subscribe({
      next: response => {
        console.log('Se modificó el caballo:', response);
        this.originalHorseData = this.analysisData.horse
      },
      error: error => {
        console.error('Error al editar el caballo', error)
      }
    });
  }


  handleDateChange(event: any): void {
    const selectedDate = moment(event.value);
    // Crear un objeto Moment con la fecha seleccionada
    this.formatedDate = selectedDate.format('DD-MM-YYYY');
  }


  toggleEditObservations(): void {
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
    console.log(this.analysisData.observations);
    this.analysisService.editAnalysis(this.analysisData, this.analysisImgUrl).subscribe({
      next: response => {
        console.log('Respuesta del servidor:', response);
        this.originalHorseData = this.analysisData.horse
      },
      error: error => {
        console.error('Error al editar el análisis', error)
      }
    })
  }

}