import { suite, test } from "mocha-typescript";
import { IUser } from "../interfaces/user";
import { UserSchema,IUserModel } from "../schemas/user";

import mongoose = require("mongoose");
import * as assert from "assert";
import {isNull} from "util";

@suite
class UserTest {

    //DataBase Access
    private static connection : mongoose.Connection;

    //store test data
    private data: IUser;

    //the User model
    public static User: mongoose.Model<IUserModel>;

    public static before() {
        //use q promises
        global.Promise = require("q").Promise;

        //use q library for mongoose promise
        mongoose.Promise = global.Promise;

        //connect to mongoose and create model
        const MONGODB_CONNECTION: string = "mongodb://localhost:27017/Film00-Test";
        UserTest.connection = mongoose.createConnection(MONGODB_CONNECTION);
        UserTest.User = UserTest.connection.model<IUserModel>("User", UserSchema);

        //require chai and use should() assertions
        let chai = require("chai");
        chai.should();
    }

    public static after(){
        //Cleaning DB at the end of the test
        UserTest.User.collection.drop();
    }

    constructor() {
        this.data = {
            userName : "brianLove",
            password : "brianLove",
            firstName : "Brian",
            lastName : "Love"
        };
    }

    @test("Create a new User")
    public async create() {
        //create user and return promise
        let result = await  (new UserTest.User(this.data)).save();

        result._id.should.exist;
        result.userName.should.equal(this.data.userName);
        result.password.should.equal(this.data.password);
        result.firstName.should.equal(this.data.firstName);
        result.lastName.should.equal(this.data.lastName);
    }

    @test("Get created User")
    public async getUser(){
        let result = await UserTest.User.findOne({userName : "brianLove"}).exec();

        result.should.exist;
        result.userName.should.equal(this.data.userName);
        result.password.should.equal(this.data.password);
        result.firstName.should.equal(this.data.firstName);
        result.lastName.should.equal(this.data.lastName);
    }

    @test("Update created user")
    public async updateUser(){
        let newName : string = "toto";


        await UserTest.User.findOneAndUpdate(
            {userName : "brianLove"},
            {userName : "toto"}).exec();

        let result = await UserTest.User.findOne(
            {userName : "toto"}).exec();

        result.should.exist;
        result.userName.should.equal(newName);
        result.password.should.equal(this.data.password);
        result.firstName.should.equal(this.data.firstName);
        result.lastName.should.equal(this.data.lastName);
    }

    @test("Remove created user")
    public async removeUser(){
        let newName : string = "toto";

        await UserTest.User.remove({userName : "toto"}).exec();

        let result = await UserTest.User.findOne({userName : "toto"}).exec();
        assert(isNull(result));
    }

}
