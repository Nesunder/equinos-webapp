import { Component, EventEmitter, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatIcon, MatButton],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() navigationChange = new EventEmitter<string>();

  constructor(private router: Router) { }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  setNavigationWindow(window: string) {
    this.navigationChange.emit(window);
  }
}
