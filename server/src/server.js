"use strict";
// "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var userRoute_1 = require("./routes/userRoute");
var HttpServer = (function () {
    function HttpServer() {
        var _this = this;
        this.PORT = "port";
        this.staticRoot = __dirname + '/';
        this.onStartListening = function () {
            console.log('Server running on port ', _this.getPort(), ' - OK');
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
            fs.createReadStream(this.staticRoot + 'index.html').pipe(res);
        });
        var userRoute = new userRoute_1.UserRoute();
        this.expressApp.use(userRoute.getRouter());
    };
    return HttpServer;
}());
//Create and start the server
var server = new HttpServer();
server.start();
//# sourceMappingURL=server.js.map