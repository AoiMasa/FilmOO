import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Angular Material
import {MaterialModule} from '@angular/material';

//PrimeFace
import { ButtonModule,PanelModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    //Angular Material
    MaterialModule,
    //PrimeFace
    ButtonModule,PanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
