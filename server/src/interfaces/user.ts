
import {IMovie} from './movie';


export interface IUser {
    userName? : string;
    password? : string;
    firstName? : string;
    lastName? : string;
    movies? : Array<IMovie>;
}
