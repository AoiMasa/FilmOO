import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {Movie} from "../movie/movie";
import {ConfirmationService, Message} from "primeng/primeng";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    username: string;
    movies: Movie[];
    msgs: Message[];

    constructor(private userService: UserService,private confirmationService: ConfirmationService) {
        this.msgs = []
    }

    ngOnInit() {
        if (this.userService.currentUser != null) {
            this.userService.refreshCurrentUser().then((user) => {
                this.username = user.userName;
                this.movies = user.movies;
            })

        }
        else this.username = "Default";
    }

    updateMovieRating(movie: Movie, newRating: number) {
        this.userService.updateMovieRating(movie, newRating);
    }

    removeMovieFromCollection(movie: Movie)
    {
      this.msgs = [];
        this.confirmationService.confirm({
            message: 'Do you want to remove this movie from your collection ?',
            header: 'Remove Confirmation',
            icon: 'fa fa-trash',
            accept: () => {

                if (this.userService.removeMovieFromCollection(movie)) this.msgs.push({severity:'success', summary:'Success Message', detail:movie.title + " was removed from your collection."});
                else this.msgs.push({severity:'error', summary:'Error Message', detail:movie.title+ " could not be removed. Contact the administrator."});
            },
            reject: () => {
            }
        });



    }

}
