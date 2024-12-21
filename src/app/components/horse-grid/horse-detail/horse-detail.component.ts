import { Component, Inject, OnInit } from '@angular/core';
import { HorseDataComponent } from "../horse-data/horse-data.component";
import { Horse } from '../../../../types';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-horse-detail',
  standalone: true,
  imports: [HorseDataComponent, MatDialogModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './horse-detail.component.html',
  styleUrl: './horse-detail.component.css'
})
export class HorseDetailComponent implements OnInit {
  dataSubject = new Subject<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  horse!: Horse;

  ngOnInit(): void {
    this.horse = this.data.horseData
  }

  notifyRefresh() {
    const resultData = { update: true };
    this.dataSubject.next(resultData);
  }

}
