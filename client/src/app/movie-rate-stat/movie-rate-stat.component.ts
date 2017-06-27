import { Component, OnInit, Input } from '@angular/core';
import {Movie} from '../movie/movie';

@Component({
    selector: 'movie-rate-stat',
    templateUrl: './movie-rate-stat.component.html',
    styleUrls: ['./movie-rate-stat.component.css']
})
export class MovieRateStatComponent implements OnInit {

    @Input() movie: Movie;

    ratingForChart : any;
    optionsForChart : any;

    constructor() {}

    ngOnInit() {
        this.setRatingForChart();
    }

    public setRatingForChart(){
        this.ratingForChart = {
            labels : this.movie.rates.map((x) => x.firstName + ' ' + x.lastName),
            datasets: [
                {
                    label: 'Ratings',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: this.movie.rates.map((x) => x.rating)
                }
            ]};

        this.optionsForChart = {
            // responsive:false,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        steps: 5,
                        stepValue: 1,
                        min: 0,
                        max: 5
                    }
                }]
            }
        };
    }

}
