import {Component, OnInit} from '@angular/core';
import {UserService,currentUser} from "../user/user.service";
import {Movie} from "../movie/movie";
import { Message} from "primeng/primeng";
import {MovieService} from '../movie/movie.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    myGlobalMovieStat: any;
    optionsMyGlobalMovieStat: any;
    actorsStats: any;
    optionsActorsStats: any;
    username: string;
    movies: Movie[];
    msgs: Message[];
    currentUserId: string;

    constructor(private userService: UserService,
                private movieService : MovieService) {
        this.msgs = [];
    }

    ngOnInit() {
        if (currentUser != null) {
            this.userService.refreshCurrentUser().then((user) => {
                this.username = user.userName;
                this.movies = user.movies;
                this.currentUserId = currentUser._id;
                this.setMovieStat();
                this.getActorsStats();
            });
        }

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

        this.optionsMyGlobalMovieStat = {
            responsive:false,
            maintainAspectRatio: false
        };
    }

    private getActorsStats(){
        this.movieService.getActorsStats(this.currentUserId).then(x => {
            this.actorsStats = {
                labels : x.filter(y => y.count > 1).map(y => y._id),
                datasets: [
                    {
                        label: 'Count',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: x.filter(y => y.count > 1).map(y => y.count)
                    }
                ]};

            this.optionsActorsStats = {
                responsive:false,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            stepValue: 1,
                            min: 0,
                        }
                    }]
                }
            };
        });
    }

}
