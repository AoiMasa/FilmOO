import {IMovie, IMovieRate} from "../../../../server/src/interfaces/movie";
/**
 * Created by Aoi on 15/06/2017.
 */
export class Movie implements IMovie {
    id: number;
    title: string;
    actors: string[];
    rates: Array<IMovieRate>;
}
