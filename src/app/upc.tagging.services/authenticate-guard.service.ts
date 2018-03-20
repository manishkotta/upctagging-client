import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthenticateGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(): boolean {

    let authToken = localStorage.getItem('auth_token');
    let validTo = localStorage.getItem('token_valid_to');
    if (!authToken && !validTo) {
      this.router.navigate(['login']);
      return false;
    }
    else if (new Date().getTime() >= new Date(validTo).getTime()) {
      this.router.navigate(['login']);
      return false;
    }
    else
      return true;
  }
}
