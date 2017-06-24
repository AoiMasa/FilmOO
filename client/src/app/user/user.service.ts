import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {User} from './user';
import {Movie} from '../movie/movie';
import {IUser} from '../../../../server/src/interfaces/user';
import {isNull, isNullOrUndefined} from 'util';
import {IMovieRate} from "../../../../server/src/interfaces/movie";

//Test data
/*const MOVIES: Movie[] = [
    {id: 1, name: 'Her', rating: 4, actors: []},
    {id: 2, name: 'Guardians of the galaxy', rating: 5, actors: []},
    {id: 3, name: 'Split', rating: 2, actors: []}
];*/
/*

const USERS: User[] = [
    {userName: 'Aoi', password: '123', firstName: 'Joëlle', lastName: 'Perritaz', movies: [MOVIES[0]]},
    {userName: 'Argon', password: '456', firstName: 'Sébastien', lastName: 'Schoepfer', movies: [MOVIES[1], MOVIES[2]]},
];*/


@Injectable()
export class UserService {

    public currentUser: User;

    constructor(private http: Http) {
    }

    addMovieToCollection(movie: Movie): Promise<Response> {
        // let isAdded = false;
        // //Check if it's doesn't already exist on the user's collection
        // if (movie != null && this.currentUser.movies.find(m => m.title == movie.title) == null) {
        //     //Add movie to user's collection
        //     this.currentUser.movies.push(Object.create(movie));
        //     isAdded = true;
        // }
        // return isAdded;

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const url = `http://localhost:3000/users/addmovie/${this.currentUser._id}`;

        return this.http.post(url, {_id : movie._id}, options).toPromise();
    }


    removeMovieFromCollection(movie: Movie): boolean {
        let isRemoved = false;
        //Check if it's doesn't already exist on the user's collection
        if (movie != null) {
            //Add movie to user's collection
            this.currentUser.movies.splice( this.currentUser.movies.indexOf(movie), 1);
            isRemoved = true;
        }
        return isRemoved;
    }

    //
    // create(userName: string, password: string, firstName: string, lastName: string): boolean {
    //     let isCreated = false;
    //     const newUser: User = new User(userName, password, firstName, lastName);
    //     const existingUser: User = USERS.find(user => user.userName == userName);
    //     if (newUser != null && existingUser == null) //If existingUser is null: there is no occurence of input username in db
    //     {
    //         USERS.push(newUser);
    //         this.currentUser = newUser;
    //         isCreated = true;
    //     }
    //     return isCreated;
    // }

    public create(userName: string, password: string, firstName: string, lastName: string): Promise<Response> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const url = `http://localhost:3000/users/newuser/`;

        return this.http.post(url, {
            'userName': userName,
            'password': password,
            'firstName': firstName,
            'lastName': lastName
        }, options).toPromise();
    }

    /*authenticate(userName: string, password: string): boolean {

        this.currentUser = USERS.find(user => user.userName == userName && user.password == password);

        return this.currentUser != null;
    }
     */
    updateMovieRating(movie: Movie, newRating: number): Promise<void> {
        const url = `http://localhost:3000/movies/addrating/${movie._id}`;
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http
            .post(url,JSON.stringify({userId:this.currentUser._id, firstName: this.currentUser.firstName, lastName: this.currentUser.lastName, rating: newRating}), {headers: headers})
            .toPromise()
            .then(() => null)
    }

    public connect(userName: string, password: string): Promise<boolean> {
        const url = `http://localhost:3000/users/authentificate/${userName}/${password}`;
        return this.http.get(url).toPromise().then(this.onConnectAnswer);
    }

    public onConnectAnswer = (value: Response): boolean | PromiseLike<boolean> => {
        this.currentUser = null;

        if (value.json() != null) {
            // const loadUser: User = new User(
            //     value.json()._id,
            //     value.json().userName,
            //     value.json().password,
            //     value.json().firstName,
            //     value.json().lastName);

            this.currentUser = value.json() as User; //loadUser;
        }
        return this.currentUser != null;
    }

}

