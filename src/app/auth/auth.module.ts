import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {authRoutes} from './auth.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './services/token.interceptor';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(authRoutes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {
}
