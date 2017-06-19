import { NextFunction, Request, Response } from "express";
import * as express from 'express';

import {BaseRoute} from "./baseRoute";
import {Movie} from '../schemas/movie';
import {IMovie} from '../interfaces/movie';

export class MovieRoute extends BaseRoute{

    public getRouter() : express.Router{
        let router = express.Router();

        // router.get("/users",this.getUsers);
        router.post("/newmovie",this.createMovie);
        // router.get("/authentificate/:username/:password",this.authentificate);

        return router;
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

}
