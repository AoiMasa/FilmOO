import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Movie} from "../movie/movie";
import {Subject} from "rxjs/Subject";
import {MovieService} from "../movie/movie.service";

import {Router} from "@angular/router";

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {UserService} from "../user/user.service";
import {Message, SelectItem} from "primeng/primeng";

@Component({
    selector: 'movie-search',
    templateUrl: './movie-search.component.html',
    styleUrls: ['./movie-search.component.css']
})

export class MovieSearchComponent implements OnInit {
    movies: Movie[];
    filters: SelectItem[];
    selectedFilter: string;
    msgs: Message[];

    private  searchTerms = new Subject<string>();

    constructor(private userService: UserService,
                private movieService: MovieService) {
        this.filters = [];
        this.msgs = [];
        this.filters.push({label: 'Movies', value: 'Movies'});
        this.filters.push({label: 'Actors', value: 'Actors'});
        this.selectedFilter = "Movies";
    }

    ngOnInit() {
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    getMovies(term: string): void {
        this.movies = [];
        switch (this.selectedFilter) {

            case "Movies":
                this.movieService.findMoviesByName(term).then(this.displayMovies);
                break;
            case "Actors":
                this.movieService.findMoviesByActor(term).then(this.displayMovies);
                break;
            default:
                alert("Filter problem");
                break;
        }
    }

    private displayMovies = (movies: Movie[]) => {
        if (movies != null) {
            this.movies = movies;
        }
    }


    updateMovieRating(movie: Movie, newRating: number) {
        this.msgs = [];
        this.userService.updateMovieRating(movie, newRating)
            .then(m => {
                this.msgs.push({severity:'success', summary:'Success Message', detail:movie.title + " was rated " + newRating +"/5 !"
                });
            })
            .catch (() => this.msgs.push({severity:'warn', summary:'warn Message', detail:"You failed"}));

        //A film rated should be in the user collection
        this.userService.addMovieToCollection(movie);
    }
}
