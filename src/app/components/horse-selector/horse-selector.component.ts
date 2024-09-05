import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HorseDto } from '../../../types';
import { MatIconModule } from '@angular/material/icon';
import { HorseSelectorDialogComponent } from './horse-selector-dialog/horse-selector-dialog.component';
import { HorseService } from '../../services/horse.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-horse-selector',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './horse-selector.component.html',
  styleUrl: './horse-selector.component.css'
})
export class HorseSelectorComponent implements OnInit {
  @Output() horseSelected = new EventEmitter<HorseDto>();
  selectedHorse: HorseDto | null = null;
  horses: HorseDto[] = [];

  constructor(private dialog: MatDialog, private horseService: HorseService,
    private imageService: ImageService) { }

  ngOnInit() {
    const storedHorses = localStorage.getItem('horses');
    if (storedHorses) {
      this.horses = JSON.parse(storedHorses);
    } else {
      this.getHorses();
    }
  }
  getHorses() {
    this.horseService.getHorses()
      .subscribe({
        next: response => {
          this.horses = response.map(horse => {
            return {
              ...horse,
              image: this.imageService.getCompressedHorseImage(horse.image!)
            }
          })
          localStorage.setItem('horses', JSON.stringify(this.horses));
        },
        error: error => {
          console.error('Error al obtener los caballos', error);
        }
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(HorseSelectorDialogComponent, {
      width: '500px',
      data: { horses: this.horses }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedHorse = result;
        this.horseSelected.emit(result);
      }
    });
  }
}
