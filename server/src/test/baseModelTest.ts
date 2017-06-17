import mongoose = require('mongoose');

/**
 * Base class for test model
 */

export class baseModelTest {

    // connect to mongoose and create model
    protected static readonly MONGODB_CONNECTION : string = 'mongodb://localhost:27017/Film00-Test';

    // DataBase Access
    protected static connection: mongoose.Connection;


    public static before() {
        // use q promises
        global.Promise = require('q').Promise;

        // use q library for mongoose promise
        mongoose.Promise = global.Promise;

        baseModelTest.connection = mongoose.createConnection(this.MONGODB_CONNECTION);

        // require chai and use should() assertions
        const chai = require('chai');
        chai.should();
    }

}
