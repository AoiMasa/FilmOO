import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from './user';
import {Movie} from '../movie/movie';

export let currentUser: User;

@Injectable()
export class UserService {

    constructor(private http: Http) {
    }

    addMovieToCollection(movie: Movie): Promise<Response> {

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const url = `http://localhost:3000/users/addmovie/${currentUser._id}`;

        return this.http.post(url, {_id : movie._id}, options).toPromise();
    }


    removeMovieFromCollection(movie: Movie): boolean {
        let isRemoved = false;
        //Check if it's doesn't already exist on the user's collection
        if (movie != null) {
            //Add movie to user's collection
            currentUser.movies.splice(currentUser.movies.indexOf(movie), 1);
            isRemoved = true;
        }
        return isRemoved;
    }


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

    updateMovieRating(movie: Movie, newRating: number): Promise<Movie> {
        const url = `http://localhost:3000/movies/addrating/${movie._id}`;
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http
            .post(url,JSON.stringify({userId: currentUser._id, firstName: currentUser.firstName, lastName: currentUser.lastName, rating: newRating}), {headers: headers})
            .toPromise()
            .then(() => movie);
    }

    public connect(userName: string, password: string): Promise<boolean> {
        const url = `http://localhost:3000/users/authentificate/${userName}/${password}`;
        return this.http.get(url).toPromise().then(this.onConnectAnswer);
    }

    public onConnectAnswer = (value: Response): boolean | PromiseLike<boolean> => {
        currentUser = null;

        if (value.json() != null) {
            currentUser = User.createInstanceFromJSON(value.json());

            sessionStorage.setItem("currentUserName",currentUser.userName);
            sessionStorage.setItem("currentPassword",currentUser.password);
        }

        return currentUser != null;
    }

    public refreshCurrentUser(): Promise<User> {
        const url = `http://localhost:3000/users/user/${currentUser._id}`;
        return this.http.get(url) .toPromise().then((user) => {
            if (user.json() != null) {
                currentUser = User.createInstanceFromJSON(user.json());
            }

            return currentUser;
        });
    }

    public clearCurrentUser(){
        currentUser = null;
    }

}



