import { Component, Input, OnInit } from '@angular/core';
import { HorseDto } from '../../../../types';
import { ImageModule } from 'primeng/image';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-horse',
  standalone: true,
  imports: [ImageModule, MatCardModule, MatButton, MatIcon, ButtonModule, CommonModule],
  templateUrl: './horse.component.html',
  styleUrl: './horse.component.css'
})
export class HorseComponent implements OnInit {

  @Input() horse!: HorseDto;

  horseImgUrl: string = ''
  horseCompressedImgUrl: string = ''

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
    if (this.horse.image) {
      this.horseImgUrl = `${this.horse?.image}`;
    }
  }

  openHorseDialog() {
    throw new Error('Method not implemented.');
  }

  deleteHorse() {
    throw new Error('Method not implemented.');
  }


}
