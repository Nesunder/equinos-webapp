import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './singUp/signup.component';
import { AuthGuard } from './auth.guard';


export const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: '/login' }
];