import { Injectable } from '@angular/core';
import { Login } from '../modals/login';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  AuthenticateUserCreds(login: Login): Observable<any> {
    console.count("Authentication Service");
    //const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<any>("http://localhost:51684/api/login/authenticate-user", { "Email": login.Email, "Password": login.Password }, { withCredentials: true, observe: 'response' });  
  }

}
