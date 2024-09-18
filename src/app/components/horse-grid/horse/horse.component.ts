import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Horse, HorseDto } from '../../../../types';
import { ImageModule } from 'primeng/image';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HorseDetailComponent } from '../horse-detail/horse-detail.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { HorseService } from '../../../services/horse.service';

@Component({
  selector: 'app-horse',
  standalone: true,
  imports: [ImageModule, MatCardModule, MatButton, MatIcon, ButtonModule, CommonModule],
  templateUrl: './horse.component.html',
  styleUrl: './horse.component.css'
})
export class HorseComponent implements OnInit {
  @Input() horse!: HorseDto;
  @Output() notifyMustRefresh = new EventEmitter<boolean>();


  horseImgUrl: string = ''
  horseCompressedImgUrl: string = ''
  updateGrid: boolean = false;

  constructor(public dialog: MatDialog, private horseService: HorseService) { }
  ngOnInit(): void {
    if (this.horse.image) {
      this.horseImgUrl = `${this.horse?.image}`;
    }
  }

  openHorseDialog() {
    let horseObject: Horse = this.mapHorseDtoToHorse(this.horse)
    const dialogRef = this.dialog.open(HorseDetailComponent, {
      width: '60%',
      data: {
        horseData: horseObject,
        horseImgUrl: this.horseImgUrl,
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

  mapHorseDtoToHorse(horseDto: HorseDto): Horse {
    return {
      id: horseDto.id,
      name: horseDto.name,
      sexo: this.horseService.mapGenderToSexo(horseDto.gender),  // Aquí mapeamos gender a sexo
      dateOfBirth: horseDto.dateOfBirth,  // Ajustar formato si es necesario
      entrenamiento: horseDto.entrenamiento,
      estabulacion: horseDto.estabulacion,
      salidaAPiquete: horseDto.salidaAPiquete,
      dolor: horseDto.dolor,
      image: horseDto.image,
      observations: horseDto.observations,
    };
  }

  deleteHorse() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro de que quiere eliminar este caballo? Esta acción no se puede deshacer.'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.horseService.deleteHorse(this.horse.id).subscribe({
          next: response => {
            console.log('Se eliminó el caballo', response);
            this.notifyMustRefresh.emit(true)
          },
          error: error => {
            if (error.status === 409) {
              console.error('No se puede eliminar el caballo: está referenciado en análisis', error);
              alert('El caballo no se puede eliminar porque forma parte de uno o más análisis.');
            } else console.error('Error al eliminar el caballo', error);
          }
        });
      }
    });
  }
}
