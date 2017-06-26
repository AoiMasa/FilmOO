import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "../register/register.component";
import {UserProfileComponent} from "../user-profile/user-profile.component";
import {MovieAddComponent} from "../movie-add/movie-add.component";
import {LoginComponent} from "../login/login.component";
import {AuthGard} from "./auth.gard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
      canActivate : [AuthGard]
  },
  {
    path: 'movie-add',
    component: MovieAddComponent,
      canActivate : [AuthGard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
