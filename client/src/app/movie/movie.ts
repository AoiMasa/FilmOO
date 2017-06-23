import {IMovie, IMovieRate} from "../../../../server/src/interfaces/movie";
/**
 * Created by Aoi on 15/06/2017.
 */
export class Movie implements IMovie {
    public _id: string;
    public title: string;
    public actors: string[];
    public rates: Array<IMovieRate>;

}

export  class MovieRate implements  IMovieRate{
    userId : string;
    firstName : string;
    lastName : string;
    rating : number;
}

export class Result
{
    movie: Movie;
    userRating: IMovieRate;
}
