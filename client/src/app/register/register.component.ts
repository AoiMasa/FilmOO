import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {first} from 'rxjs/operator/first';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit() {
    }

    private isTextNullOrEmpty(text: string): boolean {
        return text == null || text.trim() == '';
    }

    private  cancel() {
        this.router.navigate(['/login']);
    }

    private  createProfile(username: string, password: string, firstname: string, lastname: string) {
        if (!this.isTextNullOrEmpty(username) &&
            !this.isTextNullOrEmpty(password) &&
            !this.isTextNullOrEmpty(firstname) &&
            !this.isTextNullOrEmpty(lastname)) {

            this.userService.create(username, password, firstname, lastname)
                .then(() => {
                    this.userService.connect(username, password).then(isSuccessed => {
                        if (isSuccessed) {
                            this.router.navigate(['/user-profile']);
                        }else {
                            alert("Unknown username and/or password !");
                        }
                    });
                })
                .catch(() => {alert('Username already exists.'); });



        }
        else if (this.isTextNullOrEmpty(username)) {
            alert('Username must not be empty !');
        }
        else if (this.isTextNullOrEmpty(password)) {
            alert('Password must not be empty !');
        }
        else if (this.isTextNullOrEmpty(firstname)) {
            alert('Firstname must not be empty !');
        }
        else if (this.isTextNullOrEmpty(lastname)) {
            alert('Lastname must not be empty !');
        }


    }

}
