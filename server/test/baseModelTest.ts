import mongoose = require('mongoose');
import * as chai from 'chai';
import chaiHttp  = require('chai-http');

let config = require('config');

/**
 * Base class for test model
 */

export class baseModelTest {

    // connect to mongoose and create model
    protected static readonly MONGODB_CONNECTION : string = config.DBHost; //'mongodb://localhost:27017/Film00-Test';

    // DataBase Access
    protected static connection: mongoose.Connection;


    public static before() {
        // use q promises
        global.Promise = require('q').Promise;

        // use q library for mongoose promise
        mongoose.Promise = global.Promise;

        baseModelTest.connection = mongoose.createConnection(this.MONGODB_CONNECTION);

        // require chai and use should() assertions
        //const chai = require('chai'); = import * as chai from 'chai';
        //const chaiHttp = require('chai-http');
        chai.should();
        chai.use(chaiHttp);
    }

}

