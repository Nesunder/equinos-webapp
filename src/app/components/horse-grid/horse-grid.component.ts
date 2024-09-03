import { Component, OnInit } from '@angular/core';
import { HorseDto } from '../../../types';
import { HorseComponent } from "./horse/horse.component";
import { CommonModule } from '@angular/common';
import { HorseService } from '../../services/horse.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-horse-grid',
  standalone: true,
  imports: [HorseComponent, CommonModule],
  templateUrl: './horse-grid.component.html',
  styleUrl: './horse-grid.component.css'
})
export class HorseGridComponent implements OnInit {

  horses: HorseDto[] = []

  constructor(private horseService: HorseService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getHorses()
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
        },
        error: error => {
          console.error('Error al obtener los caballos', error);
        }
      });
  }
}
