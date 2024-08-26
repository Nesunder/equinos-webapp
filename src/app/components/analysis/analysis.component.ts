import { Component, Input, OnInit } from '@angular/core';
import { Analysis } from '../../../types';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [ImageModule],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent implements OnInit {
  @Input() analysis!: Analysis;
  imageUrl: string | undefined;

  ngOnInit(): void {
    if (this.analysis.image) {
      this.imageUrl = `data:image/jpeg;base64,${this.analysis.image}`;
    }
  }
}
