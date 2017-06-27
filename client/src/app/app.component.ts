import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService, currentUser} from "./user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

    constructor(private userService : UserService,
                private router: Router){
    }

    public get title(){
        if(currentUser != null){
            return " -> " + currentUser.firstName + " " + currentUser.lastName;
        }else{
            return "";
        }
    }

    logOut() {
        sessionStorage.clear();
        this.userService.clearCurrentUser();
        this.router.navigateByUrl('/login');
    }

}
