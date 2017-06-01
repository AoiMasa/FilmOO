// "use strict";

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

import mongoose = require("mongoose");



class HttpServer {

    private readonly PORT : string = "port";
    private readonly MONGODB_CONNECTION : string = "mongodb://localhost:27017/mean2Db";

    private expressApp : express.Application;
    private expressRouterApi : express.Router;


    private staticRoot : string = __dirname + '/';

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
            fs.createReadStream(this.staticRoot + 'index.html').pipe(res);
        });

    }

    private onStartListening = () => {
        console.log('Server running on port ', this.getPort(), ' - OK');
    }

}

//Create and start the server
let server : HttpServer = new HttpServer();
server.start();





