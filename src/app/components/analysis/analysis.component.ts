import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Analysis } from '../../../types';
import { ImageModule } from 'primeng/image';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AnalysisDetailComponent } from './analysis-detail/analysis-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { AnalysisService } from '../../services/analysis.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TaggerComponent } from './tagger/tagger.component';


@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [ImageModule, MatCardModule, MatButton, MatIcon, ButtonModule, CommonModule, AnalysisDetailComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent implements OnInit {
  @Input() analysis!: Analysis;
  @Output() notifyMustRefresh = new EventEmitter<boolean>();

  classifiedImgUrl: string = ''
  horseImgUrl: string = ''
  showCustomActions: boolean = false;
  updateGrid: boolean = false;

  constructor(public dialog: MatDialog, private analysisService: AnalysisService) { }

  ngOnInit(): void {
    if (this.analysis.image) {
      this.classifiedImgUrl = `${this.analysis.image}`;
    }
    this.horseImgUrl = `${this.analysis.horse?.image}`;
  }

  openAnalysisDialog(): void {
    const dialogRef = this.dialog.open(AnalysisDetailComponent, {
      width: '60%',
      data: {
        analysisData: this.analysis,
        horseImgUrl: this.horseImgUrl,
        analysisImgUrl: this.classifiedImgUrl
      }
    });

    // Subscribe to the Subject to get updates without closing the dialog
    dialogRef.componentInstance.dataSubject.subscribe(result => {
      if (result.update) {
        this.updateGrid = true;
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.updateGrid) this.notifyMustRefresh.emit(true)
      this.updateGrid = false;
    });
  }

  closePreview() {
    this.showCustomActions = false;
  }

  downloadImage() {
    fetch(this.classifiedImgUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'analysis.jpg';
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error al descargar la imagen:', error));
  }


  deleteAnalysis() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro de que quiere eliminar este análisis? Esta acción no se puede deshacer.'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.analysisService.deleteAnalysis(this.analysis.id).subscribe({
          next: response => {
            console.log('Se eliminó el análisis', response);
            this.notifyMustRefresh.emit(true)
          },
          error: error => {
            console.error('Error al eliminar el análisis', error)
          }
        });
      }
    });

  }

  tagAnalysis() {
    const dialogRef = this.dialog.open(TaggerComponent, {
      width: '60%',
      maxWidth: '400px',
      data: {
        analysisId: this.analysis.id,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.refresh) {
        this.notifyMustRefresh.emit(true);
      }
    });
  }

}
