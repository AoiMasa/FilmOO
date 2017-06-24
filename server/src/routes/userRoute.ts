import { NextFunction, Request, Response } from "express";
import * as express from 'express';


import {BaseRoute} from "./baseRoute";
import {User} from '../schemas/user';
import {IUser} from '../interfaces/user';
import {ObjectID} from 'bson';

export class UserRoute extends BaseRoute{

    public getRouter() : express.Router{
        let router = express.Router();

        router.get("/users",this.getUsers);
        router.post("/newuser",this.createUser);
        router.get("/authentificate/:username/:password",this.authentificate);
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

    private addMovie = (req: Request, res: Response) => {

        this.db.user.findOne({_id : req.params.userid}).exec().then(x => {
          //  let user : IUser = x as IUser;
            if(x != null){
                if(x.movies != null) {
                    x.movies = [];
                }
                x.movies.push(req.body as ObjectID);
                x.save().then(() => {
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



