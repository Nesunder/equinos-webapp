import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    this.initThemeDetection();
  }

  private initThemeDetection() {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkModeSubject.next(darkMode);
    this.updateSweetAlert2Theme(darkMode);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      this.isDarkModeSubject.next(event.matches);
      this.updateSweetAlert2Theme(event.matches);
    });
  }

  private updateSweetAlert2Theme(isDarkMode: boolean) {
    if (isDarkMode) {
      Swal.getContainer()?.classList.add('swal2-dark');
    } else {
      Swal.getContainer()?.classList.remove('swal2-dark');
    }
  }

  showSuccessAlert(title: string, timer: number = 3000) {
    return Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: timer,
      confirmButtonText: 'Ok',
      customClass: {
        popup: this.isDarkModeSubject.value ? 'swal2-dark' : ''
      },
    });
  }

  showSuccesToast(title: string, timer: number = 3000) {
    return Swal.fire({
      icon: "success",
      title: title,
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      customClass: {
        popup: this.isDarkModeSubject.value ? 'swal2-dark' : ''
      },
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  }

  showErrorAlert(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Ok',
      customClass: {
        popup: this.isDarkModeSubject.value ? 'swal2-dark' : ''
      }
    });
  }
}