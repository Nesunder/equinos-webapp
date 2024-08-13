import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  signupData = { identificacion: '', password: '', advancedUser: false };
  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onPasswordChange() {
    this.passwordsDoNotMatch = this.signupData.password !== this.confirmPassword && this.confirmPassword !== '';
  }

  onSubmit() {
    if (this.signupData.password !== this.confirmPassword) {
      this.passwordsDoNotMatch = true;
      return;
    }
    this.passwordsDoNotMatch = false;

    this.authService.createUser(this.signupData.identificacion, this.signupData.password, this.signupData.advancedUser)
    .subscribe({
      next: response => {
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Error al crear la cuenta', error);
      }
    });
  }
}
