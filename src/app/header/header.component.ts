import { Component, OnInit } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  signOutBtnText: string;

  constructor(private cookieService: CookieService, private route: Router) { }

  ngOnInit() {
    if (this.route.url === '/login') {
      this.signOutBtnText = 'Sign In';
    }
    else if (this.route.url === '/') {
      this.signOutBtnText = 'Sign In';
    }
    else {
      this.signOutBtnText = 'Sign Out';
    }
  }

  logoutHndlr() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token_valid_to');
    this.cookieService.delete('userRole');
    this.route.navigateByUrl('/login');
  }
}
