import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HorseDto } from '../../../../types';

@Component({
  selector: 'app-horse-selector-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './horse-selector-dialog.component.html',
  styleUrl: './horse-selector-dialog.component.css'
})
export class HorseSelectorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HorseSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { horses: HorseDto[] }
  ) { }

  selectHorse(horse: HorseDto) {
    this.dialogRef.close(horse);
  }
}
