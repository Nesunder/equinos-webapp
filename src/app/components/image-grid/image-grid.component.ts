import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ImageUploadComponent } from "../image-upload/image-upload.component";
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [NgFor, ImageUploadComponent, MatGridListModule],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.css'
})
export class ImageGridComponent {
  images = [
    { url: 'assets/images/background.jpg' },
    { url: 'assets/images/background.jpg' },
    { url: 'assets/images/background.jpg' },
    { url: 'assets/images/background.jpg' },
    { url: 'assets/images/background.jpg' },
    { url: 'assets/images/background.jpg' },
    { url: 'assets/images/background.jpg' },


    // More images...
  ];
}
