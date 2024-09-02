import { Component, OnInit } from '@angular/core';
import { Horse, HorseDto } from '../../../types';
import { HorseComponent } from "./horse/horse.component";
import { CommonModule } from '@angular/common';
import { HorseService } from '../../services/horse.service';

@Component({
  selector: 'app-horse-grid',
  standalone: true,
  imports: [HorseComponent, CommonModule],
  templateUrl: './horse-grid.component.html',
  styleUrl: './horse-grid.component.css'
})
export class HorseGridComponent implements OnInit {

  horses: HorseDto[] = []

  constructor(private horseService: HorseService) { }

  ngOnInit(): void {
    this.getHorses()
  }

  getHorses() {
    this.horseService.getHorses()
      .subscribe({
        next: response => {
          console.log('Respuesta del servidor:', response);
          this.horses = response
        },
        error: error => {
          console.error('Error al obtener los caballos', error);
        }
      });
  }
}
