import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AnalysisService } from '../../../services/analysis.service';
import { ObservationDto } from '../../../../types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tagger',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './tagger.component.html',
  styleUrl: './tagger.component.css'
})

export class TaggerComponent implements OnInit {
  protected tagForm: FormGroup;
  private analysisId = -1;

  constructor(
    public dialogRef: MatDialogRef<TaggerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private analysisService: AnalysisService) {
    this.tagForm = this.fb.group({
      prediction: ['', Validators.required],
      observations: ['']
    });
  }

  ngOnInit(): void {
    this.analysisId = this.data.analysisId;
  }

  tagAnalysis() {
    if (this.tagForm.valid) {
      const formValue = this.tagForm.value;
      const observationDto: ObservationDto = {
        analysisId: this.analysisId,
        observation: formValue.observations,
        predictionEnum: formValue.prediction
      }

      this.analysisService.tagAnalysis(observationDto).subscribe({
        next: response => {
          console.log('Se agregó el tag al análisis', response);
          this.dialogRef.close({ refresh: true });
          Swal.fire({
            icon: "success",
            title: "Se agregó el tag al análisis",
            showConfirmButton: false,
            timer: 5000
          });
        },
        error: error => {
          console.error('Error al etiquetar el análisis', error)
          Swal.fire({
            title: 'Error!',
            text: 'Error al etiquetar el análisis, debe tener permisos de usuario avanzado',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      });
    }
  }

}
