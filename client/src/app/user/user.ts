import {IUser} from "../../../../server/src/interfaces/user";
import {Movie} from "../movie/movie";
/**
 * Created by Aoi on 15/06/2017.
 */
export class User implements IUser{

    public _id: string;

    public movies: Movie[];

    constructor (public userName: string, public password: string, public firstName: string, public lastName: string) {

    }
}
