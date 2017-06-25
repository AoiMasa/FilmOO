import {Injectable} from "@angular/core";
import {User} from "../user/user";
import {Http,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Movie} from "./movie";
import {isNullOrUndefined} from "util";
import {IMovie} from "../../../../server/src/interfaces/movie";
import {UserService,currentUser} from '../user/user.service';


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

    constructor(private http: Http, private userService: UserService) {
    }

    /*search(term: string): Observable<Movie[]> {
        return Observable.of(MOVIES.filter(m => m.name.toUpperCase().includes(term.toUpperCase())).slice(0, 1));
    }*/

    findMoviesByName(term: string): Promise<IMovie[]> {
        const url = `http://localhost:3000/movies/findbytitle/${term}`;
        return this.http.get(url).toPromise().then(this.convertMovies);
        //
        //     response => {
        //
        //     if (response != null && response.json() != null){
        //         let movies : IMovie[] =  response.json() as IMovie[];
        //         return movies;
        //     }else{
        //         return null;
        //     }
        // });

        // return MOVIES.filter(m => m.name.toUpperCase().includes(term.toUpperCase()) || m.actors.find(a => a.toUpperCase().includes(term.toUpperCase())));
    }

    findMoviesByActor(term: string): Promise<IMovie[]> {
        const url = `http://localhost:3000/movies/findbyactor/${term}`;
        return this.http.get(url).toPromise().then(this.convertMovies);
    }

    private convertMovies = (response : Response) :  Movie[] | PromiseLike<Movie[]> => {
        if (response != null && response.json() != null){
            const movies: Movie[] = new Array<Movie>(); //=  response.json() as IMovie[];
            const values: IMovie[] = response.json() as IMovie[];

            for(let movie of values){
                movies.push(Movie.createInstanceFromJSON(movie));
            }

            return movies;
        }else{
            return null;
        }
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
