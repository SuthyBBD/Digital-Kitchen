import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './services/auth.guard';

export const authRoutes: Routes = [

  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]}
];
