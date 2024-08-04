import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = { identificacion: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData.identificacion, this.loginData.password)
    .subscribe({
      next: response => {
        console.log('Respuesta del servidor:', response);
        this.authService.storeUserData(response);
        this.router.navigate(['/home']);
      },
      error: error => {
        console.error('Error en el inicio de sesión', error);
      }
    });
  }
}
 