import { Component, Input, OnInit } from '@angular/core';
import { Analysis } from '../../../types';
import { ImageModule } from 'primeng/image';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AnalysisDetailComponent } from './analysis-detail/analysis-detail.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [ImageModule, MatCardModule, MatButton, MatIcon, ButtonModule, CommonModule, AnalysisDetailComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent implements OnInit {
  @Input() analysis!: Analysis;
  classifiedImgUrl: string = ''
  horseImgUrl: string = ''
  showCustomActions: boolean = false;
  horseCompressedImgUrl: string = ''

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.analysis.image) {
      this.classifiedImgUrl = `data:image/jpeg;base64,${this.analysis.image}`;
    }
    this.horseCompressedImgUrl = `data:image/jpeg;base64,${this.analysis.horse?.compressedImage}`;
    this.horseImgUrl = `data:image/jpeg;base64,${this.analysis.horse?.image}`;

  }

  openDialog(): void {
    this.dialog.open(AnalysisDetailComponent, {
      width: '60%', // Ajusta el tamaño del diálogo si es necesario
      data: {
        analysisData: this.analysis,
        horseImgUrl: this.horseImgUrl,
        analysisImgUrl: this.classifiedImgUrl
      }
    });
  }

  closePreview() {
    this.showCustomActions = false;
  }

  downloadImage() {
    // Call the method to download the image
    this.downloadBase64File(this.classifiedImgUrl, 'downloaded_image.jpeg');
  }

  downloadBase64File(base64Data: string, fileName: string) {
    // Convert the Base64 string to a Blob
    const blob = this.base64ToBlob(base64Data);

    // Create a link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  }

  base64ToBlob(base64Data: string, contentType: string = ''): Blob {
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: contentType });
  }

}
