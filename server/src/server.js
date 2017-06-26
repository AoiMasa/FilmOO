"use strict";
// "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var userRoute_1 = require("./routes/userRoute");
var db_1 = require("./db");
var movieRoute_1 = require("./routes/movieRoute");
var HttpServer = (function () {
    function HttpServer() {
        var _this = this;
        this.PORT = "port";
        this.staticRoot = __dirname + '/';
        this.db = new db_1.DB();
        this.onStartListening = function () {
            console.log('Server running on port ', _this.getPort(), ' - OK');
            console.log('Connection to MongoDB : ', _this.db.MONGODB_CONNECTION);
        };
        this.expressApp = express();
        this.config();
        this.routes();
    }
    HttpServer.prototype.start = function () {
        this.expressApp.listen(this.getPort(), this.onStartListening);
    };
    HttpServer.prototype.getPort = function () {
        return this.expressApp.get(this.PORT);
    };
    HttpServer.prototype.config = function () {
        this.expressApp.set(this.PORT, (process.env.PORT || 3000));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));
        this.expressApp.use(express.static(this.staticRoot));
        //Used to allow CORS
        this.expressApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    HttpServer.prototype.routes = function () {
        //Default route
        this.expressApp.get('/', function (req, res) {
            fs.createReadStream(__dirname + '/' + 'index.html').pipe(res);
        });
        var userRoute = new userRoute_1.UserRoute(this.db);
        this.expressApp.use('/users', userRoute.getRouter());
        var movieRoute = new movieRoute_1.MovieRoute(this.db);
        this.expressApp.use('/movies', movieRoute.getRouter());
    };
    return HttpServer;
}());
exports.HttpServer = HttpServer;
//Create and start the server
exports.server = new HttpServer();
exports.server.start();
