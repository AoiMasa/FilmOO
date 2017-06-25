import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService,currentUser} from "../user/user.service";
import {Movie} from "../movie/movie";
import {ConfirmationService, Message} from "primeng/primeng";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    myGlobalMovieStat : any;

    username: string;
    movies: Movie[];
    msgs: Message[];
    currentUserId: string;

    constructor(private userService: UserService,private confirmationService: ConfirmationService) {
        this.msgs = [];

    }
    ngOnInit() {
        if (currentUser != null) {
            this.userService.refreshCurrentUser().then((user) => {
                this.username = user.userName;
                this.movies = user.movies;
                this.currentUserId = currentUser._id;
                this.setMovieStat();
            });
        }
        else this.username = "Default";
    }

    updateMovieRating(movie: Movie, newRating: number) {
        this.userService.updateMovieRating(movie, newRating);
    }

    private setMovieStat(){

        let valof1: number = 0;
        this.movies.forEach((x) => valof1 += x.rates.filter((y) => y.rating === 1).length);
        let valof2: number = 0;
        this.movies.forEach((x) => valof2 += x.rates.filter((y) => y.rating === 2).length);
        let valof3: number = 0;
        this.movies.forEach((x) => valof3 += x.rates.filter((y) => y.rating === 3).length);
        let valof4: number = 0;
        this.movies.forEach((x) => valof4 += x.rates.filter((y) => y.rating === 4).length);
        let valof5: number = 0;
        this.movies.forEach((x) => valof5 += x.rates.filter((y) => y.rating === 5).length);

        this.myGlobalMovieStat = {
            labels : ['Rate to 1','Rate to 2','Rate to 3','Rate to 4','Rate to 5'],
            datasets: [
                {
                    data: [ valof1,valof2,valof3,valof4,valof5],
                    backgroundColor: [
                        "#44ff6e",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#ff3533"
                    ]
                }
            ]};


    }

    // removeMovieFromCollection(movie: Movie)
    // {
    //   this.msgs = [];
    //     this.confirmationService.confirm({
    //         message: 'Do you want to remove this movie from your collection ?',
    //         header: 'Remove Confirmation',
    //         icon: 'fa fa-trash',
    //         accept: () => {
    //
    //             if (this.userService.removeMovieFromCollection(movie)) this.msgs.push({severity:'success', summary:'Success Message', detail:movie.title + " was removed from your collection."});
    //             else this.msgs.push({severity:'error', summary:'Error Message', detail:movie.title+ " could not be removed. Contact the administrator."});
    //         },
    //         reject: () => {
    //         }
    //     })
    // }





}
