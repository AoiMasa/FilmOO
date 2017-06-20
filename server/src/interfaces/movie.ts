
export  interface IMovieRate{
    userId? : string;
    firstName? : string;
    lastName? : string;
    rating? : number;
}

export interface IMovie{
    title?: string;
    year?: number;
    image? : string;
    actors?: Array<string>;
    rates?: Array<IMovieRate>;
}
