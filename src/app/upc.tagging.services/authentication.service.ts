import { Injectable } from '@angular/core';
import { Login } from '../modals/login';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  AuthenticateUserCreds(login: Login): Observable<any> {
    console.count("Authentication Service");
    let header = new HttpHeaders();
    header.append('withCredentials', 'true');
    return this.http.post<any>("http://localhost:51684/api/login/authenticate-user", { "Email": login.Email, "Password": login.Password }, { headers : header });  
  }

}
