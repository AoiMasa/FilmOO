//Angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Angular Material
import {MaterialModule} from '@angular/material';

//PrimeFace
import {ButtonModule, ConfirmationService, ConfirmDialogModule, PanelModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {TabMenuModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';

//Application
import {AppComponent} from './app.component';
import {UserService} from "./user/user.service";
import {AuthGard} from "./app-routing/auth.gard";
import {MenuComponent} from "./menu/menu.component";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MovieAddComponent} from './movie-add/movie-add.component';
import {MovieSearchComponent} from './movie-search/movie-search.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {MovieService} from "./movie/movie.service";
import { MovieRateStatComponent } from './movie-rate-stat/movie-rate-stat.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        MovieAddComponent,
        MovieSearchComponent,
        UserProfileComponent,
        MenuComponent,
        MovieRateStatComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        //Angular Material
        MaterialModule,
        //PrimeFace
        ButtonModule, PanelModule,
        AppRoutingModule,
        DataListModule,
        SpinnerModule,
        DropdownModule,
        GrowlModule,
        TabMenuModule,
        ConfirmDialogModule,
        FieldsetModule,
        DataTableModule,
        ChartModule
    ],
    providers: [
        AuthGard,
        UserService,
        MovieService,
        ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
