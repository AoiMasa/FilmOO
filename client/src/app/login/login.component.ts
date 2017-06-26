import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {UserService} from "../user/user.service";
import {User} from "../user/user";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private userService: UserService) {}

    ngOnInit() {}

    private  login(username: string, password: string) {
        this.userService.connect(username, password).then(isSuccessed => {
            if (isSuccessed) {
                this.router.navigate(['/user-profile']);
            } else {
                alert('Unknown username and/or password !');
            }
        });
    }

    private  register() {
        this.router.navigate(['/register']);
    }

}
