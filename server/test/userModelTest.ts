import { suite, test } from 'mocha-typescript';
import mongoose = require('mongoose');
import * as assert from 'assert';
import {isNull} from 'util';
import * as chai from 'chai';

import { IUser } from '../src/interfaces/user';
import { UserSchema, IUserModel } from '../src/schemas/user';
import { baseModelTest }  from './baseModelTest';
import {HttpServer, server} from '../src/server';
import {IMovie} from '../src/interfaces/movie';
import {MovieModelTest} from './movieModelTest';

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

        await chai.request(server.expressApp).post('/users/newuser').send(this.data).then();
        const result = await UserModelTest.User.findOne({userName : 'brianLove'}).exec();

        result._id.should.exist;
        result.userName.should.equal(this.data.userName);
        result.password.should.equal(this.data.password);
        result.firstName.should.equal(this.data.firstName);
        result.lastName.should.equal(this.data.lastName);
    }

    @test('From REST - Authentificate')
    public async authentificateRest() {

        const url = `/users/authentificate/${this.data.userName}/${this.data.password}`;
        const result = await chai.request(server.expressApp).get(url).then();

        result.body._id.should.exist;
        result.body.userName.should.equal(this.data.userName);
        result.body.password.should.equal(this.data.password);
        result.body.firstName.should.equal(this.data.firstName);
        result.body.lastName.should.equal(this.data.lastName);
    }

    @test('From REST - Add movie to user')
    public async addMovieToUser() {

        //Create Movie
        let newMovie1: IMovie = {title : 'user2 1', actors : ['111','22 findme 22']};
        const movie1 = await (new MovieModelTest.Movie(newMovie1)).save();

        //Get User
        let user = await UserModelTest.User.findOne({userName : 'brianLove'}).exec();

        //Proceed adding user to movie
        const url = `/users/addmovie/${user._id}`;
        await chai.request(server.expressApp).post(url).send({_id : movie1._id}).then();

        //Retrieve update user
        user = await UserModelTest.User.findOne({userName : 'brianLove'}).populate('movies').exec();

        user._id.should.exist;
        user.movies.length.should.equal(1);
        user.movies[0].title.should.equal(movie1.title);

        await chai.request(server.expressApp).post(url).send({_id : movie1._id}).then();
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


    @test('Create a new User with Movies')
    public async createWithMovies() {

        let newMovie1: IMovie = {title : 'user1 1', actors : ['111','22 findme 22']};
        let newMovie2: IMovie = {title : 'user1 2', actors : ['222','22 findMe 22']};
        let newMovie3: IMovie = {title : 'user1 3', actors : ['333','2222']};

        const movie1 = await (new MovieModelTest.Movie(newMovie1)).save();
        const movie2 = await (new MovieModelTest.Movie(newMovie2)).save();
        const movie3 = await (new MovieModelTest.Movie(newMovie3)).save();

        let user : IUser = {};
        user.userName  = 'user1';
        user.password  = 'password1';
        user.firstName = 'firstName1';
        user.lastName  = 'lastName1';
        user.movies = [];
        user.movies.push(movie1._id);
        user.movies.push(movie2._id);
        user.movies.push(movie3._id);

        // create user and return promise
        await (new UserModelTest.User(user)).save();

        const result = await  (UserModelTest.User.findOne({userName : user.userName}).populate('movies').exec());

        result._id.should.exist;
        result.userName.should.equal(user.userName);
        result.password.should.equal(user.password);
        result.firstName.should.equal(user.firstName);
        result.lastName.should.equal(user.lastName);
        result.movies.length.should.equal(3);
        result.movies[0].title.should.equal(movie1.title);
        result.movies[1].title.should.equal(movie2.title);
        result.movies[2].title.should.equal(movie3.title);
    }




    @test('Get created User')
    public async getUser(){
        const result = await UserModelTest.User.findOne({userName : 'brianLove'}).exec();

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
