import {IMovie, IMovieRate} from "../../../../server/src/interfaces/movie";
import {currentUser} from '../user/user.service';

export  class MovieRate implements  IMovieRate {
    userId: string;
    firstName: string;
    lastName: string;
    rating: number;

    public static createInstanceFromJSON(value: IMovieRate): MovieRate {
        const newMovieRate: MovieRate = new MovieRate();

        newMovieRate.userId = value.userId;
        newMovieRate.firstName = value.firstName;
        newMovieRate.lastName = value.lastName;
        newMovieRate.rating = value.rating;

        return newMovieRate;
    }
}

export class Movie implements IMovie {
    public _id: string;
    public title: string;
    public year: number;
    public actors: string[];
    public rates: Array<IMovieRate>;

    public static createInstanceFromJSON(value: IMovie): Movie {
        const newMovie: Movie = new Movie();

        newMovie._id = (value as any)._id;
        newMovie.title = value.title;
        newMovie.year = value.year;
        newMovie.actors = value.actors;
        newMovie.rates = new Array<MovieRate>();

        if(value.rates != null) {
            for (let rate of value.rates) {
                newMovie.rates.push(MovieRate.createInstanceFromJSON(rate));
            }
        }

        return newMovie;
    }

    public get globalRating() {
        let total: number = 0;

        for (let rate of this.rates) {
            total += rate.rating;
        }

        if (this.rates.length > 0) {
            return total / this.rates.length;
        } else {
            return 0;
        }
    }

    public get userRate(): number{
        if (currentUser._id != null) {
            const rate: IMovieRate = this.rates.find(r => r.userId == currentUser._id);
            if (rate != null) {
                return rate.rating;
            } else {
                return 0;
            }
        }else{
            return 0;
        }
    }

    public set userRate(newRating: number){
        if (currentUser._id != null) {
            const rate: IMovieRate = this.rates.find(r => r.userId == currentUser._id);
            if (rate != null) rate.rating = newRating;
        }
    }
}
