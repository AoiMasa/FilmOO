import {IUser} from "../../../../server/src/interfaces/user";
import {Movie} from "../movie/movie";

/**
 * Created by Aoi on 15/06/2017.
 */
export class User implements IUser{

    public _id: string;
    public userName : string;
    public password : string;
    public firstName : string;
    public lastName : string;
    public movies: Movie[];

    // constructor ( public _id: string, public userName: string, public password: string, public firstName: string, public lastName: string) {
    //
    // }

    public static createInstanceFromJSON(value: IUser): User {
        const newUser: User = new User();

        newUser._id =  (value as any)._id;
        newUser.userName = value.userName;
        newUser.password = value.password;
        newUser.firstName = value.firstName;
        newUser.lastName = value.lastName;

        newUser.movies = new Array<Movie>();

        for(let movie of value.movies){
            newUser.movies.push(Movie.createInstanceFromJSON(movie));
        }

        return newUser;
    }
}
