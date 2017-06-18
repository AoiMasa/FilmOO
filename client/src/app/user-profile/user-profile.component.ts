import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {Movie} from "../movie/movie";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    username: string;
    movies: Movie[]

    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        if (this.userService.currentUser != null) {
            this.username = this.userService.currentUser.userName;
            this.movies = this.userService.currentUser.movies;
        }
        else this.username = "Default";
    }

    private  addMovies() {
        this.router.navigate(['/movie-add']);
    }

    updateMovieRating(movie: Movie, newRating: number) {
        this.userService.updateMovieRating(movie, newRating);
    }

}
