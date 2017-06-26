import {Component, OnInit} from '@angular/core';
import {Movie} from "../movie/movie";
import {UserService} from "../user/user.service";

@Component({
    selector: 'app-movie-add',
    templateUrl: './movie-add.component.html',
    styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {

    constructor(private userService: UserService) {}

    ngOnInit() {}

    addMovie(movie: Movie): void {
        if (this.userService.addMovieToCollection(movie)) alert(movie.title + " was added to your collection !");
        else  alert(movie.title + " is already to your collection !");
    }

}
