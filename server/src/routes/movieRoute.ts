
import { NextFunction, Request, Response } from "express";
import * as express from 'express';

import {BaseRoute} from "./baseRoute";
import {Movie} from '../schemas/movie';
import {IMovie, IMovieRate} from '../interfaces/movie';
import {isNullOrUndefined} from 'util';

'TMDB'
const tmdb = require('tmdbv3').init('97c570e4bd1d4eaf2dde07999a7007bd');

export class MovieRoute extends BaseRoute{

    public getRouter() : express.Router{
        let router = express.Router();

        router.get("/findonebytitle/:title",this.getMovieByTitle);
        router.get("/findonebyid/:id",this.getMovieById);
        router.post("/newmovie",this.createMovie);
        router.post("/addrating/:movieid/",this.rateMovie);

        return router;
    }

    private getMovieByTitle = (req: Request, res: Response, next: NextFunction) => {
        this.db.movie.findOne({title : req.params.title}).exec().then(x => {

            res.json(x);
            next();
        })
    }

    private getMovieById = (req: Request, res: Response, next: NextFunction) => {
        this.db.movie.findOne({_id : req.params.id}).exec().then(x => {
            res.json(x);
            next();
        })
    }

    private getMovies = (req: Request, res: Response, next: NextFunction) => {
        this.db.movie.find().exec().then(x => {
            res.json(x);
            next();
        })
    }

    private createMovie = (req: Request, res: Response) => {
        tmdb.movie.info("5", (err : any ,res : any) => {
            console.log(res.title);
            //https://image.tmdb.org/t/p/w500/
        });

        let newMovie: IMovie = {};

        newMovie.title = req.body.title;
        newMovie.year = req.body.year;
        newMovie.actors = [];

        for(let actor of req.body.actors){
            newMovie.actors.push(actor);
        }

        (new this.db.movie(newMovie)).save().then(() => res.send('OK'));
    }


    private rateMovie = (req: Request, res: Response) => {
        let newRate: IMovieRate = {};

        newRate.userId = req.body.userId;
        newRate.firstName = req.body.firstName;
        newRate.lastName = req.body.lastName;
        newRate.rating = req.body.rating;

        this.db.movie.findOne({_id : req.params.movieid}).exec().then(x => {

            if(isNullOrUndefined(x.rates)){ x.rates = new Array();}
            x.rates.push(newRate);

            this.db.movie.update({_id : req.params.movieid}, x).exec()
                .then(() => res.send('OK'))
                .catch(() => {res.send('NOK')});
        });

    }

}
