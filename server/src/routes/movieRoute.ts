
import { NextFunction, Request, Response } from "express";
import * as express from 'express';

import {BaseRoute} from "./baseRoute";
import {Movie} from '../schemas/movie';
import {IMovie, IMovieRate} from '../interfaces/movie';
import {isNullOrUndefined} from 'util';


export class MovieRoute extends BaseRoute{

    public getRouter() : express.Router{
        let router = express.Router();

        router.get("/findbytitle/:title",this.getMoviesByTitle);
        router.get("/findbyactor/:name",this.getMoviesByActor);
        router.get("/findonebytitle/:title",this.getOneMovieByTitle);
        router.get("/findonebyid/:id",this.getMovieById);
        router.post("/newmovie",this.createMovie);
        router.post("/addrating/:movieid/",this.rateMovie);

        return router;
    }



    private getMoviesByTitle = (req: Request, res: Response, next: NextFunction) => {
        let reg : RegExp = new RegExp(`.*${req.params.title}.*`, 'i'); //'i' to set case-insensitive regular exp.
        this.db.movie.where('title').regex(reg).limit(100).exec().then(x => {

            res.json(x);
            next();
        })
    }

    private getMoviesByActor = (req: Request, res: Response, next: NextFunction) => {
        let reg : RegExp = new RegExp(`.*${req.params.name}.*`, 'i'); //'i' to set case-insensitive regular exp.

        this.db.movie.where('actors').regex(reg).limit(100).exec().then(x => {
            res.json(x);
            next();
        })
    }

    private getOneMovieByTitle = (req: Request, res: Response, next: NextFunction) => {
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
            let existing : IMovieRate[] = x.rates.filter(r => r.userId == newRate.userId);

            if (existing.length > 0)
            {
                x.rates.splice(x.rates.indexOf(existing[0]),1,newRate);
            }
            else  x.rates.push(newRate);


            this.db.movie.update({_id : req.params.movieid}, x).exec()
                .then(() => res.send('OK'))
                .catch(() => {res.send('NOK')});
        });

    }

}
