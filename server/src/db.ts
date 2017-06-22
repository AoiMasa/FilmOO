//import * as mongoose from 'mongoose';
import mongoose = require("mongoose");
import { UserSchema,IUserModel } from "./schemas/user";
import {IMovieModel, MovieSchema} from './schemas/movie';

//let config = require('config');
/**
 * Created by Argon on 01.06.17.
 */
export class DB{

    private readonly MONGODB_CONNECTION : string = "mongodb://localhost:27017/Film00";//config.DBHost;//

    private connection : mongoose.Connection;
    public user: mongoose.Model<IUserModel>;
    public movie: mongoose.Model<IMovieModel>;

    public constructor() {
        this.config();
    }

    public config() {
        //use q promises
        global.Promise = require("q").Promise;

        //use q library for mongoose promise
        mongoose.Promise = global.Promise;

        //connect to mongoose and create model
        this.connection = mongoose.createConnection(this.MONGODB_CONNECTION);
        this.user = this.connection.model<IUserModel>("User", UserSchema);
        this.movie = this.connection.model<IMovieModel>("Movie", MovieSchema);

    }
}



