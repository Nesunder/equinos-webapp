import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files != null;
    if (files) {
      // Handle file upload logic here
    }
  }
}
