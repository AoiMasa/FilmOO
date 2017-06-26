import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { UserService,currentUser } from '../user/user.service';
import {User} from "../user/user";

@Injectable()
export class AuthGard implements CanActivate {

    constructor(private userService: UserService,
                private router: Router) {}

    async canActivate() {

        if (currentUser == null) {

            if (sessionStorage.getItem("currentUserName")) {

                return await this.userService.connect(
                    sessionStorage.getItem("currentUserName"),
                    sessionStorage.getItem("currentPassword")
                ).then();

            }
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
