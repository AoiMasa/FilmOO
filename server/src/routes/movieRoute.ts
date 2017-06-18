import { NextFunction, Request, Response } from "express";
import * as express from 'express';

import {BaseRoute} from "./baseRoute";
import {Movie} from '../schemas/movie';
import {IMovie} from '../interfaces/movie';

export class MovieRoute extends BaseRoute{

    public getRouter() : express.Router{
        let router = express.Router();

        // router.get("/users",this.getUsers);
        // router.post("/newuser",this.createUser);
        // router.get("/authentificate/:username/:password",this.authentificate);

        return router;
    }

    private getMovies = (req: Request, res: Response, next: NextFunction) => {
        this.db.movie.find().exec().then(x => {
            res.json(x);
            next();
        })
    }

    // private createUser = (req: Request, res: Response) => {
    //
    //     let newUser: IUser = {};
    //
    //     console.log(req.body.userName);
    //     console.log(req.body.password);
    //     console.log(req.body.firstName);
    //     console.log(req.body.lastName);
    //
    //     newUser.userName = req.body.userName;
    //     newUser.password = req.body.password;
    //     newUser.firstName = req.body.firstName;
    //     newUser.lastName = req.body.lastName;
    //
    //     (new this.db.user(newUser)).save().then(() => res.send('OK'));
    // }
    //
    // private authentificate = (req: Request, res: Response, next: NextFunction) => {
    //     this.db.user.findOne({userName : req.params.username, password : req.params.password}).exec().then(x => {
    //         res.json(x);
    //         next();
    //     })
    // }
