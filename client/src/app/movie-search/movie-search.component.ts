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
import {isNullOrUndefined} from "util";


@Component({
    selector: 'movie-search',
    templateUrl: './movie-search.component.html',
    styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
    movies: Observable<Movie[]>;
    result: Movie[];
    filters: SelectItem[];
    selectedFilter: string;
    msgs: Message[];

    private searchTerms = new Subject<string>();


    constructor(private userService: UserService,
                private movieService: MovieService) {
        this.result = [];
        this.filters = [];
        this.msgs = [];
        this.filters.push({label: 'All', value: 'All'});
        this.filters.push({label: 'Movies', value: 'Movies'});
        this.filters.push({label: 'Actors', value: 'Actors'});
        this.selectedFilter = "All";

    }


    ngOnInit() {
       /* this.movies = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.movieService.search(term)
                // or the observable of empty movies if there was no search term
                : Observable.of<Movie[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Movie[]>([]);
            });*/
        this.addMoviesToResult("Kadens War");
    }


    search(term: string): void {
        this.searchTerms.next(term);
    }

    addMovieToResult(movie: Movie): void {
        this.result = []; //Clear old results
        this.result.push(movie)
    }

    addMoviesToResult(term: string): void {
        this.result = []; //Clear old results

        //let movies: Movie[] = [];

        switch (this.selectedFilter) {
            case "All":
                 this.movieService.findMovies(term).then(this.displayMovies);
                break;
            case "Movies":
                //movies = this.movieService.findMoviesByName(term);
                break;
            case "Actors":
                //movies = this.movieService.findMoviesByActor(term);
                break;
            default:
                alert("Filter problem");
                break;
        }
    }

    private displayMovies = (movies : Movie[]) => {
        if(movies != null) {
            let newRes : Movie[] = [];
            for (var _i = 0; _i < movies.length; _i++) {
                let m: Movie = movies[_i] as Movie;
                newRes.push(m);
            }
            this.result = newRes;
        }
    }


    addMovie(movie: Movie): void {
        this.msgs = [];

        if (this.userService.addMovieToCollection(movie)) {
            this.msgs.push({severity:'success', summary:'Success Message', detail:movie.title + " was added to your collection !"});
            this.result.splice(this.result.indexOf(movie), 1);
        }
        else this.msgs.push({severity:'warn', summary:'Warn Message', detail:movie.title + " is already to your collection !"});
    }
}
