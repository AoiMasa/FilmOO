import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {User} from "./user";
import {Movie} from "./movie";

//Test data
const MOVIES: Movie[] = [
  {id: 1, name: "Her", rating: 4},
  {id: 2, name: "Guardians of the galaxy", rating: 5},
  {id: 3, name: "Split", rating: 2}
]

const USERS: User[] = [
  {userName: 'Aoi', password: '123', firstName: 'Joëlle', lastName: 'Perritaz', movies: [MOVIES[0]]},
  {userName: 'Argon', password: '456', firstName: 'Sébastien', lastName: 'Schoepfer', movies: [MOVIES[1], MOVIES[2]]},
];

@Injectable()
export class UserService {

  public currentUser: User;

  constructor(private http: Http) { }

  addMovieToCollection(movie: Movie): boolean {
    let isAdded: boolean = false;
    //Check if it's doesn't already exist on the user's collection
    if (movie != null && this.currentUser.movies.find(m => m.name == movie.name) == null) {
      //Add movie to user's collection
      this.currentUser.movies.push(movie);
      isAdded = true;
    }
    return isAdded;
  }

  create(userName: string, password: string, firstName: string, lastName: string): boolean {
    let isCreated: boolean = false;
    let newUser: User = new User(userName, password, firstName, lastName);
    let existingUser: User = USERS.find(user => user.userName == userName);
    if (newUser != null && existingUser == null) //If existingUser is null: there is no occurence of input username in db
    {
      USERS.push(newUser);
      this.currentUser = newUser;
      isCreated = true;
    }
    return isCreated;
  }

  private async getCurrentUser(userName: string, password: string) {
    //this.currentUser = USERS.find(user => user.userName == userName && user.password == password);
//http://localhost:3000/authentificate/brianLove/brianLove

    const url =  `authentificate/${userName}/${password}`;
    this.currentUser = await this.http.get(url).toPromise().then(res => res.json().data as User);

  }

  public authenticate(userName: string, password: string): boolean {
    //this.currentUser = USERS.find(user => user.userName == userName && user.password == password);
//http://localhost:3000/authentificate/brianLove/brianLove

    this.getCurrentUser(userName, password);

    return this.currentUser != null;
  }
}
