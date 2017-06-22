// "use strict";

import mongoose = require("mongoose");
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

import { UserRoute } from "./routes/userRoute";
import { DB } from "./db";
import {MovieRoute} from './routes/movieRoute';

export class HttpServer {

    private readonly PORT : string = "port";
    public expressApp : express.Application; //Public to be accessed by test
    private staticRoot : string = __dirname + '/';

    private db : DB = new DB();

    constructor() {
        this.expressApp = express();

        this.config();
        this.routes();

    }

    public start() : void {
        this.expressApp.listen(this.getPort(),this.onStartListening);
    }


    private getPort() : number{
        return this.expressApp.get(this.PORT);
    }

    private config() : void {
        this.expressApp.set(this.PORT, (process.env.PORT || 3000));

        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({extended: true}));

        this.expressApp.use(express.static(this.staticRoot));

        //Used to allow CORS
        this.expressApp.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

    }

    private routes() : void{

        //Default route
        this.expressApp.get('/', function(req, res) {
            fs.createReadStream(__dirname + '/' + 'index.html').pipe(res);
        });

        let userRoute = new UserRoute(this.db);
        this.expressApp.use('/users',userRoute.getRouter());

        let movieRoute = new MovieRoute(this.db);
        this.expressApp.use('/movies',movieRoute.getRouter());

    }

    private onStartListening = () => {
        console.log('Server running on port ', this.getPort(), ' - OK');
        console.log('Connection to MongoDB : ', this.db.MONGODB_CONNECTION);
    }

}

//Create and start the server
export let server : HttpServer = new HttpServer();
server.start();





/*
let imdb = require('imdb');

imdb('tt3659388', (err : any, data : any) => {
    if (err)
        console.log(err.stack);

    if (data)
        console.log(data);
});
*/
