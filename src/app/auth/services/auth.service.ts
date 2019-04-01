import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import * as moment from 'moment';
import {JwtHelperService} from '@auth0/angular-jwt';

const jwt = new JwtHelperService();

class DecodedToken {
  exp = 0;
  username = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('dk_meta')) || new DecodedToken();
  }

  private storeToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('dk-auth', token);
    localStorage.setItem('dk_meta', JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData: any): Observable<any> {
    return this.http.post('api/v1/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('api/v1/users/auth', userData).pipe(map(
      (token: string) => this.storeToken(token)));
  }

  public logout() {
    localStorage.removeItem('dk_auth');
    localStorage.removeItem('dk_meta');

    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string {
    return localStorage.getItem('bwm_auth');
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

  public getUserId(): string {
    return this.decodedToken.userId;
  }
}
