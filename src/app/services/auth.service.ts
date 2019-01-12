import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseViewModelWithEntity } from '../ViewModels/response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LogInViewModel } from '../ViewModels/logInViewModel';

const httpOptions = { 
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  logIn(logInViewModel: LogInViewModel)
  {
    const body = JSON.stringify(logInViewModel);
    return this.http.post<ResponseViewModelWithEntity>('/api/auth/login', body, httpOptions);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('AuthorizationToken');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
