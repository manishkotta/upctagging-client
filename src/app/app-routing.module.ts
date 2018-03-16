import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppLoginComponent } from './app-login/app-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: AppLoginComponent },
  { path: '', component: AppLoginComponent }
]


@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
