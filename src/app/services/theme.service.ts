import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkModeSubject.next(darkMode);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      this.isDarkModeSubject.next(event.matches);
    });
  }
}