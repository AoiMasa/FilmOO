import {Injectable} from "@angular/core";
import {User} from "../user/user";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Movie} from "./movie";
import {isNullOrUndefined} from "util";
import {IMovie} from "../../../../server/src/interfaces/movie";

const ACTORS: string[] = [
    "Chris Pratt",
    "Angelina Jolie",
    "Sebastien Schoepfer"
];


/*const MOVIES: Movie[] = [
    {id: 1, name: 'Her', rating: 4, actors: [ACTORS[1], ACTORS[2]]},
    {id: 2, name: 'Guardians of the galaxy', rating: 5, actors: [ACTORS[0], ACTORS[1], ACTORS[2]]},
    {id: 3, name: 'Split', rating: 2, actors: [ACTORS[2]]}
];*/

@Injectable()
export class MovieService {

    constructor(private http: Http) {
    }

    /*search(term: string): Observable<Movie[]> {
        return Observable.of(MOVIES.filter(m => m.name.toUpperCase().includes(term.toUpperCase())).slice(0, 1));
    }*/

    findMovies(term: string): Promise<IMovie[]> {
        const url = `http://localhost:3000/movies/findonebytitle/${term}`;


        return this.http.get(url).toPromise().then(response => {
            //if (!isNullOrUndefined(response) && !isNullOrUndefined(response.json())){

                let movies : IMovie[] =  [];
                movies.push(response.json() as IMovie);
                return movies ;
           // }else{
           //     return null;
           // }
        });

        // return MOVIES.filter(m => m.name.toUpperCase().includes(term.toUpperCase()) || m.actors.find(a => a.toUpperCase().includes(term.toUpperCase())));
    }
/*
    findMoviesByName(term: string): Movie[] {
        return MOVIES.filter(m => m.name.toUpperCase().includes(term.toUpperCase()));
    }

    findMoviesByActor(term: string): Movie[] {
        return MOVIES.filter(m => m.actors.find(a => a.toUpperCase().includes(term.toUpperCase())));
    }

    searchJson(term: string): Observable<Movie[]> {
        return this.http
            .get(`app/heroes/?name=${term}`)
            .map(response => response.json().data as Movie[]);
    }*/


}
