import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Login } from '../modals/login';
import { AuthenticationService } from '../upc.tagging.services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,) {
    this.submitted = false;
    this.login = new Login();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard'; 
  }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    this._authenticationService.AuthenticateUserCreds(this.login).subscribe(res => {
      console.log(res.headers.get('.AspNetCore.Cookies'));
      if (res.ok == true) {
        console.log(res.headers.get('Set-Cookie'));
        this.router.navigateByUrl(this.returnUrl);
      }
    }, err => {
      console.log(err);
    })

  }
}
