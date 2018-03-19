import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Login } from '../modals/login';
import { AuthenticationService } from '../upc.tagging.services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {


  login: Login;

  submitted: boolean;
  returnUrl: string;

  constructor(private _authenticationService: AuthenticationService,private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService) {
    this.submitted = false;
    this.login = new Login();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard'; 
  }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    this._authenticationService.AuthenticateUserCreds(this.login)
      .subscribe(res => {
        if (res.ok == true) {
          localStorage.setItem('auth_token', res.body.authToken);
          this.cookieService.set('userRole', res.body.roleName);
          this.router.navigateByUrl(this.returnUrl);
      }
    }, err => {
      console.log(err);
    })

  }
}
