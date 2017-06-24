import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Movie, Result} from "../movie/movie";
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
import {IMovieRate} from "../../../../server/src/interfaces/movie";


@Component({
    selector: 'movie-search',
    templateUrl: './movie-search.component.html',
    styleUrls: ['./movie-search.component.css']
})



export class MovieSearchComponent implements OnInit {
    movies: Observable<Movie[]>;
    result: Result[];
    filters: SelectItem[];
    selectedFilter: string;
    msgs: Message[];


    private  searchTerms = new Subject<string>();


    constructor(private userService: UserService,
                private movieService: MovieService) {
        this.result = [];
        this.filters = [];
        this.msgs = [];
        this.filters.push({label: 'Movies', value: 'Movies'});
        this.filters.push({label: 'Actors', value: 'Actors'});
        this.selectedFilter = "Movies";
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
        //this.addMoviesToResult("Kadens War");
    }


    search(term: string): void {
        this.searchTerms.next(term);
    }

    private searchUserRating(movie: Movie) : IMovieRate{
        let  userRates : Array<IMovieRate> = movie.rates.filter(r => r.userId == this.userService.currentUser._id);

        if (userRates.length > 0 ) return userRates[0];
        else return {userId:"-1", firstName: "Default", lastName: "Default", rating: 0};


    }

    private searchGlobalRating(movie:Movie): number
    {
        let globalRate: number = 0;

        for (var _i = 0; _i < movie.rates.length; _i++) {
            let m: IMovieRate = movie.rates[_i] as IMovieRate;
            globalRate = globalRate + m.rating;
        }
        if ( movie.rates.length > 0 ) return globalRate / movie.rates.length;
        else return 0;
    }


    addMovieToResult(movie: Movie): void {
        this.result = []; //Clear old results
        this.result.push({movie: movie, userRating: this.searchUserRating(movie),globalRating:this.searchGlobalRating(movie)});
    }

    addMoviesToResult(term: string): void {
        this.result = []; //Clear old results

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

    private displayMovies = (movies : Movie[]) => {
        if(movies != null) {
            let newRes : Result[] = [];
            for (var _i = 0; _i < movies.length; _i++) {
                let m: Movie = movies[_i] as Movie;
                newRes.push({movie:m, userRating:this.searchUserRating(m),globalRating:this.searchGlobalRating(m)});
            }
            this.result = newRes;
        }
    }


    addMovie(movie: Movie): void {
        // //this.msgs = [];
        //
        // if (this.userService.addMovieToCollection(movie)) {
        //     this.msgs.push({severity:'success', summary:'Success Message', detail:movie.title + " was added to your collection !"});
    }

    updateMovieRating(movie: Movie, newRating: number) {
        this.msgs = [];
        this.userService.updateMovieRating(movie, newRating)
            .then(m => {this.result.find(mo => mo.movie == m).globalRating = this.searchGlobalRating(m);
                        this.msgs.push({severity:'success', summary:'Success Message', detail:movie.title + " was rated " + newRating +"/5 !"}
                        );})
        .catch (() => this.msgs.push({severity:'warn', summary:'warn Message', detail:"You failed"}));


    }
}
