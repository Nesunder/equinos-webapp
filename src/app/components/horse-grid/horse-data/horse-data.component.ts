import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HorseService } from '../../../services/horse.service';
import { Horse } from '../../../../types';
import moment from 'moment';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ThemeService } from '../../../services/theme.service';

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
  selector: 'app-horse-data',
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
  templateUrl: './horse-data.component.html',
  styleUrl: './horse-data.component.css'
})
export class HorseDataComponent implements OnInit {

  @Input() horse!: Horse;
  @Output() notifyMustRefresh = new EventEmitter<boolean>();

  horseForm: FormGroup;
  isEditingHorse = false;
  formatedDate: string = '';
  originalHorseData: Horse | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private horseService: HorseService,
    private themeService: ThemeService
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
  }


  ngOnInit(): void {
    this.originalHorseData = { ...this.horse };
    this.formatedDate = this.horse.dateOfBirth;
    const dateOfBirth = moment(this.formatedDate, 'DD-MM-YYYY');

    this.horseForm.patchValue({
      ...this.horse,
      dateOfBirth: dateOfBirth
    });
  }

  toggleEditHorse(): void {
    const userRole = localStorage.getItem('role');
    if (userRole === 'USER') {
      this.themeService.showErrorAlert('', 'Error al editar el caballo, debe tener permisos de usuario avanzado');
      return;
    }

    if (this.isEditingHorse) {
      this.saveHorseDetails();
    }
    this.isEditingHorse = !this.isEditingHorse;
  }

  saveHorseDetails(): void {
    if (this.horseForm.valid) {
      const formValue = this.horseForm.value;
      const updatedHorse: Horse = {
        ...this.horse,
        ...formValue,
        dateOfBirth: this.formatedDate
      };
      if (this.hasHorseDataChanged(updatedHorse)) {
        this.horse = updatedHorse;
        this.editHorse();
      } else {
        console.log('No se detectaron cambios en los detalles del equino');
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
    this.horseService.editHorse(this.horse).subscribe({
      next: response => {
        console.log('Se modificó el caballo:', response);
        this.originalHorseData = this.horse
        this.notifyMustRefresh.emit(true);
        this.themeService.showSuccesToast('Se modificó el caballo!');
      },
      error: error => {
        console.error('Error al editar el caballo', error)
        this.themeService.showErrorAlert('Error!', 'Error al editar el caballo, debe tener permisos de usuario avanzado');
      }
    });
  }

  handleDateChange(event: any): void {
    const selectedDate = moment(event.value);
    // Crear un objeto Moment con la fecha seleccionada
    this.formatedDate = selectedDate.format('DD-MM-YYYY');
  }
}
