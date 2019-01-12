import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUpViewModel } from '../ViewModels/signUpViewModel';
import { ResponseViewModel } from '../ViewModels/response';

const httpOptions = { 
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  signUp(signUpViewModel: SignUpViewModel)
  {
    const body = JSON.stringify(signUpViewModel);
    return this.http.post<ResponseViewModel>('/api/account/signup', body, httpOptions);
  }
}
