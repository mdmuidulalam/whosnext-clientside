import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpViewModel } from '../ViewModels/signUpViewModel';
import { ResponseViewModel, ResponseViewModelWithEntity } from '../ViewModels/response';
import { Helper } from '../helper/helper';

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
    return this.http.post<ResponseViewModel>('/api/accounts/signup', body, httpOptions);
  }

  searchFriendsBySearchText(searchText: string) : Observable<ResponseViewModelWithEntity> {
    return this.http.get<ResponseViewModelWithEntity>('/api/accounts/friendsbysearch' + Helper.queryStringBuilder({
      'userEmail' : '',
      'searchText' : searchText,
    }));
  }
}
