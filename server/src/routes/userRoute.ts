import { NextFunction, Request, Response } from "express";
import * as express from 'express';


import {BaseRoute} from "./baseRoute";
import {User} from '../schemas/user';
import {IUser} from '../interfaces/user';
import {ObjectID} from 'bson';
import {IMovie} from '../interfaces/movie';


let movie = require('node-movie');

export class UserRoute extends BaseRoute{

    public getRouter() : express.Router{
        let router = express.Router();

        router.get("/users",this.getUsers);
        router.post("/newuser",this.createUser);
        router.get("/authentificate/:username/:password",this.authentificate);
        router.get("/user/:id",this.getUser);
        router.post("/addmovie/:userid",this.addMovie);

        return router;
    }

    private getUsers = (req: Request, res: Response, next: NextFunction) => {
        this.db.user.find().exec().then(x => {
            res.json(x);
            next();
        })
    }

    private createUser = (req: Request, res: Response) => {
        let newUser: IUser = req.body as IUser;

        (new this.db.user(newUser)).save().then(() => res.send('OK'));
    }

    private authentificate = (req: Request, res: Response, next: NextFunction) => {
        this.db.user.findOne({userName : req.params.username, password : req.params.password}).populate('movies').exec().then(x => {
            res.json(x);
            next();
        })
    }

    //
    // private async completeWithImage(movies : IMovie[]){
    //     for(let film of movies){
    //         // await movie(film.title, function (err : any, data : any) {
    //         //     if(err  || data.poster == null){
    //         //         film.image = "http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif";
    //         //     }else{
    //         //         film.image = data.poster;
    //         //     }
    //         //     console.log(film.image);
    //         // });
    //         // console.log(film.image);
    //
    //         await movie(film.title).then((x : any) => {
    //             if(x.poster == null){
    //                 film.image = "http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif";
    //             }else{
    //                 film.image = x.poster;
    //             }
    //         }).catch((x : any) => {film.image = "http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif";});
    //     }
    // }

    private getUser = (req: Request, res: Response, next: NextFunction) => {
        this.db.user.findOne({_id : req.params.id}).populate('movies').exec().then(x => {
            res.json(x);
            next();
        })
    }

    private addMovie = (req: Request, res: Response) => {

        this.db.user.findOne({_id : req.params.userid}).exec().then(x => {
          //  let user : IUser = x as IUser;
            if(x != null){
                if(x.movies == null) {
                    x.movies = [];
                }

                let id : ObjectID = new ObjectID(req.body._id);
                if(!x.movies.some((x) => {
                    return (x as ObjectID).toHexString() === id.toHexString();
                })){
                    x.movies.push(id);
                }else{
                }

                x.save().then(() => {
                    console.log(`Adding Movie ${req.body.toString()} to user ${req.params.userid} - Movie count ${x.movies.length}`);
                    res.send('OK')
                });
            }
        });

    }



    /**
     * Get a user
     *
     * @class UsersApi
     * @method get
     * @param req {Request} The express request object.
     * @param res {Response} The express response object.
     * @param next {NextFunction} The next function to continue.
     */
    /*public get(req: Request, res: Response, next: NextFunction) {
        //verify the id parameter exists
        const PARAM_ID: string = "id";
        if (typeof req.params[PARAM_ID] === "undefined" || req.params[PARAM_ID] === null) {
            res.sendStatus(404);
            next();
            return;
        }

        //get the id
        var id = req.params[PARAM_ID];

        //get authorized user
        this.authorize(req, res, next).then((user: IUserModel) => {
            //make sure the user being deleted is the authorized user
            if (user._id !== id) {
                res.sendStatus(401);
                next();
                return;
            }

            //log
            console.log(`[UsersApi.get] Retrieving user: {id: ${req.params.id}}.`);

            //find user
            User.findById(id).then((user: IUserModel) => {
                //verify user was found
                if (user === null) {
                    res.sendStatus(404);
                    next();
                    return;
                }

                //send json response
                res.json(user);
                next();
            }).catch(next);
        }).catch(next);
    }*/

}



