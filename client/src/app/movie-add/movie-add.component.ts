import {Component, OnInit} from '@angular/core';
import {Movie} from "../movie/movie";
import {UserService} from "../user/user.service";

@Component({
    selector: 'app-movie-add',
    templateUrl: './movie-add.component.html',
    styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    addMovie(movie: Movie): void {
        if (this.userService.addMovieToCollection(movie)) alert(movie.name + " was added to your collection !");
        else  alert(movie.name + " is already to your collection !");
    }

}
