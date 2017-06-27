import {Injectable} from "@angular/core";
import {Http,Response} from "@angular/http";
import {Movie} from "./movie";
import {IMovie} from "../../../../server/src/interfaces/movie";


@Injectable()
export class MovieService {

    constructor(private http: Http) {
    }

    findMoviesByName(term: string): Promise<IMovie[]> {
        const url = `http://localhost:3000/movies/findbytitle/${term}`;
        return this.http.get(url).toPromise().then(this.convertMovies);
    }

    findMoviesByActor(term: string): Promise<IMovie[]> {
        const url = `http://localhost:3000/movies/findbyactor/${term}`;
        return this.http.get(url).toPromise().then(this.convertMovies);
    }

    getActorsStats(userId : string) : Promise<any[]> {
        const url = `http://localhost:3000/movies/actorStats/${userId}`;
        return this.http.get(url).toPromise().then((x) => x.json() as Array<any>);
    }

    private convertMovies = (response : Response) :  Movie[] | PromiseLike<Movie[]> => {
        if (response != null && response.json() != null) {
            const movies: Movie[] = new Array<Movie>();
            const values: IMovie[] = response.json() as IMovie[];

            for(let movie of values){
                movies.push(Movie.createInstanceFromJSON(movie));
            }

            return movies;
        }else{
            return null;
        }
    }

}
