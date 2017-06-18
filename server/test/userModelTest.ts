import { suite, test } from 'mocha-typescript';
import mongoose = require('mongoose');
import * as assert from 'assert';
import {isNull} from 'util';
import * as chai from 'chai';

import { IUser } from '../src/interfaces/user';
import { UserSchema, IUserModel } from '../src/schemas/user';
import { baseModelTest }  from './baseModelTest';
import {HttpServer, server} from '../src/server';

@suite
class UserModelTest extends baseModelTest{

    // store test data
    private data: IUser;

    // the User model
    public static User: mongoose.Model<IUserModel>;

    public static before() {
        super.before();

        UserModelTest.User = UserModelTest.connection.model<IUserModel>('User', UserSchema);
    }

    public static after() {
        // Cleaning DB at the end of the test
        UserModelTest.User.collection.drop();
    }

    constructor() {
        super();
        this.data = {
            userName : 'brianLove',
            password : 'brianLove',
            firstName : 'Brian',
            lastName : 'Love'
        };
    }

    @test('From REST - Create new User')
    public async createRest() {

        await chai.request(server.expressApp).post('/newuser').send(this.data).then();
        const result = await UserModelTest.User.findOne({userName : 'brianLove'}).exec();

        result._id.should.exist;
        result.userName.should.equal(this.data.userName);
        result.password.should.equal(this.data.password);
        result.firstName.should.equal(this.data.firstName);
        result.lastName.should.equal(this.data.lastName);
    }

    @test('From REST - Authentificate')
    public async authentificateRest() {

        const url = `/authentificate/${this.data.userName}/${this.data.password}`;
        const result = await chai.request(server.expressApp).get(url).then();

        result.body._id.should.exist;
        result.body.userName.should.equal(this.data.userName);
        result.body.password.should.equal(this.data.password);
        result.body.firstName.should.equal(this.data.firstName);
        result.body.lastName.should.equal(this.data.lastName);
    }




    @test('Create a new User')
    public async create() {
        // create user and return promise
        const result = await  (new UserModelTest.User(this.data)).save();

        result._id.should.exist;
        result.userName.should.equal(this.data.userName);
        result.password.should.equal(this.data.password);
        result.firstName.should.equal(this.data.firstName);
        result.lastName.should.equal(this.data.lastName);
    }




    @test('Get created User')
    public async getUser(){
        const result = await UserModelTest.User.findOne({userName : 'brianLove'}).exec();

        await chai.request(server.expressApp).post('/newuser').send(this.data).then();

        result.should.exist;
        result.userName.should.equal(this.data.userName);
        result.password.should.equal(this.data.password);
        result.firstName.should.equal(this.data.firstName);
        result.lastName.should.equal(this.data.lastName);
    }

    @test('Update created user')
    public async updateUser(){
        const newName = 'toto';


        await UserModelTest.User.findOneAndUpdate(
            {userName : 'brianLove'},
            {userName : 'toto'}).exec();

        const result = await UserModelTest.User.findOne(
            {userName : 'toto'}).exec();

        result.should.exist;
        result.userName.should.equal(newName);
        result.password.should.equal(this.data.password);
        result.firstName.should.equal(this.data.firstName);
        result.lastName.should.equal(this.data.lastName);
    }

    @test('Remove created user')
    public async removeUser(){
        const newName = 'toto';

        await UserModelTest.User.remove({userName : 'toto'}).exec();

        const result = await UserModelTest.User.findOne({userName : 'toto'}).exec();
        assert(isNull(result));
    }

}
