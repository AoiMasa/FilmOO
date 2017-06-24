import {MenuItem} from "primeng/primeng";
import {Component, OnInit} from "@angular/core";
import {Router}  from '@angular/router';


@Component({
    selector: 'main-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

    constructor(private router: Router) {
    }

    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {label: 'Profile', icon: 'fa-cog',routerLink: ['/user-profile']},
            {label: 'Search movies...', icon: 'fa-film',routerLink: ['/movie-add']},
        ];
    }
}
