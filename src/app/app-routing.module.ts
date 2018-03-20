import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppLoginComponent } from './app-login/app-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthenticateGuardService } from './upc.tagging.services/authenticate-guard.service';

const routes = [
  { path: 'dashboard', canActivate: [AuthenticateGuardService],component: DashboardComponent },
  { path: 'login', component: AppLoginComponent },
  { path: '', component: AppLoginComponent }
]


@NgModule({

  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]

})
export class AppRoutingModule { }
