import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Angular Material
import {MaterialModule} from '@angular/material';
import {UserService} from "./user/user.service";

//PrimeFace
import { ButtonModule,PanelModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovieAddComponent } from './movie-add/movie-add.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MovieAddComponent,
    MovieSearchComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    //Angular Material
    MaterialModule,
    //PrimeFace
    ButtonModule,PanelModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
