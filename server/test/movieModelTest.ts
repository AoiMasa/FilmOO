import { suite, test } from 'mocha-typescript';
import { MovieSchema, IMovieModel } from '../src/schemas/movie';
import {IMovie, IMovieRate} from '../src/interfaces/movie';
import { baseModelTest }  from './baseModelTest';
import mongoose = require('mongoose');
import * as chai from 'chai';

import {HttpServer, server} from '../src/server';
import {IUser} from '../src/interfaces/user';
import {UserModelTest} from './userModelTest';

@suite
export class MovieModelTest extends baseModelTest{

    private data: IMovie;

    public static Movie: mongoose.Model<IMovieModel>;

    public static before() {
        super.before();

        MovieModelTest.Movie = MovieModelTest.connection.model<IMovieModel>('Movie', MovieSchema);
    }

    public static after() {
        // Cleaning DB at the end of the test
        MovieModelTest.Movie.collection.drop();
    }

    constructor() {
        super();
        this.data = {
            title : 'La fête du slip',
            year : 2000,
            actors : ['toto','tutu']
        };
    }

    @test('From REST - Create new movie')
    public async createRest() {

        let newMovie: IMovie = {
            title : 'La fête de caleçon',
            year : 2000,
            actors : ['toto','tutu']
        };

        await chai.request(server.expressApp).post('/movies/newmovie').send(newMovie).then();
        const result = await MovieModelTest.Movie.findOne({title : 'La fête de caleçon'}).exec();

        result._id.should.exist;
        result.title.should.equal(newMovie.title);
        result.year.should.equal(newMovie.year);
        result.actors[0].should.equal(newMovie.actors[0]);
        result.actors[1].should.equal(newMovie.actors[1]);
    }

    @test('From REST - Find movies by title')
    public async findByTitle() {

        let newMovie1: IMovie = {title : 'La fête codeatrouver 1111',};
        let newMovie2: IMovie = {title : 'La fête codeAtrouver 2222',};
        let newMovie3: IMovie = {title : 'La fête des 3333',};

        await (new MovieModelTest.Movie(newMovie1)).save();
        await (new MovieModelTest.Movie(newMovie2)).save();
        await (new MovieModelTest.Movie(newMovie3)).save();

        const url = `/movies/findbytitle/codeAtrouver`;
        const result = await chai.request(server.expressApp).get(url).then();

        let moviesRes : IMovie[] = result.body as IMovie[];

        moviesRes.length.should.equal(2);
    }

    @test('From REST - Find movies by actor')
    public async findByActor() {

        let newMovie1: IMovie = {title : 'aaaa', actors : ['111','22 findme 22']};
        let newMovie2: IMovie = {title : 'bbbb', actors : ['222','22 findMe 22']};
        let newMovie3: IMovie = {title : 'cccc', actors : ['333','2222']};

        await (new MovieModelTest.Movie(newMovie1)).save();
        await (new MovieModelTest.Movie(newMovie2)).save();
        await (new MovieModelTest.Movie(newMovie3)).save();

        const url = `/movies/findbyactor/findme`;
        const result = await chai.request(server.expressApp).get(url).then();

        let moviesRes : IMovie[] = result.body as IMovie[];

        moviesRes.length.should.equal(2);
    }


    @test('From REST - Find one movie by title')
    public async findOneMovieByTitle() {

        await (new MovieModelTest.Movie(this.data)).save();
        const url = `/movies/findonebytitle/${this.data.title}`;
        const result = await chai.request(server.expressApp).get(url).then();

        result.body._id.should.exist;
        result.body.title.should.equal(this.data.title);
        result.body.year.should.equal(this.data.year);
        result.body.actors[0].should.equal(this.data.actors[0]);
        result.body.actors[1].should.equal(this.data.actors[1]);
    }

    @test('From REST - Find one movie by id')
    public async findOneMovieById() {

        let newMovie: IMovie = {
            title : 'La fête de poilu',
            year : 2002,
            actors : ['toto','tutu']
        };

        const newMovieWithId = await (new MovieModelTest.Movie(newMovie)).save();

        const url = `/movies/findonebyid/${newMovieWithId._id}`;
        const result = await chai.request(server.expressApp).get(url).then();

        result.body._id.should.exist;
        result.body.title.should.equal(newMovieWithId.title);
        result.body.year.should.equal(newMovieWithId.year);
        result.body.actors[0].should.equal(newMovieWithId.actors[0]);
        result.body.actors[1].should.equal(newMovieWithId.actors[1]);
    }

    @test('From REST - Add rating to Movie')
    public async addRatingToMovie() {

        const url = `/movies/findonebytitle/${this.data.title}`;
        let result = await chai.request(server.expressApp).get(url).then();

        let newRate: IMovieRate = {
            userId : '1',
            firstName : 'Toto',
            lastName : 'Le Hero',
            rating : 5
        };

        await chai.request(server.expressApp).post(`/movies/addrating/${result.body._id}`).send(newRate).then();

        result = await chai.request(server.expressApp).get(url).then();

        result.body.rates[0].userId.should.equal(newRate.userId);
        result.body.rates[0].lastName.should.equal(newRate.lastName);
        result.body.rates[0].firstName.should.equal(newRate.firstName);
        result.body.rates[0].rating.should.equal(newRate.rating);
    }

    @test('From REST - Aggregating actors data')
    public async getActorStat() {

        let newMovie1: IMovie = {title : 'user2 1', actors : ['111','22 findMe 22']};
        let newMovie2: IMovie = {title : 'user2 2', actors : ['111','22 findMe 22']};
        let newMovie3: IMovie = {title : 'user2 3', actors : ['333','111']};

        const movie1 = await (new MovieModelTest.Movie(newMovie1)).save();
        const movie2 = await (new MovieModelTest.Movie(newMovie2)).save();
        const movie3 = await (new MovieModelTest.Movie(newMovie3)).save();

        let user : IUser = {};
        user.userName  = 'user2';
        user.password  = 'password2';
        user.firstName = 'firstName2';
        user.lastName  = 'lastName2';
        user.movies = [];
        user.movies.push(movie1._id);
        user.movies.push(movie2._id);
        user.movies.push(movie3._id);

        // create user and return promise
        const savedUser = await (new UserModelTest.User(user)).save();

        const url = `/movies/actorStats/${savedUser._id}`;
        let result = await chai.request(server.expressApp).get(url).then();

        result.body.length.should.equals(3);
    }

    @test('Create a new movie')
    public async create() {
        // create user and return promise
        const result = await  (new MovieModelTest.Movie(this.data)).save();

        result._id.should.exist;
        result.title.should.equal(this.data.title);
        result.year.should.equal(this.data.year);
        result.actors[0].should.equal(this.data.actors[0]);
        result.actors[1].should.equal(this.data.actors[1]);
    }

    @test('Get created movie')
    public async getUser() {
        const result = await MovieModelTest.Movie.findOne({title: 'La fête du slip'}).exec();

        result.should.exist;
        result.title.should.equal(this.data.title);
        result.year.should.equal(this.data.year);
        result.actors[0].should.equal(this.data.actors[0]);
        result.actors[1].should.equal(this.data.actors[1]);
    }
/*
    @test('Update created user')
    public async updateUser() {
        const newName = 'toto';


        await MovieModelTest.User.findOneAndUpdate(
            {userName: 'brianLove'},
            {userName: 'toto'}).exec();

        const result = await MovieModelTest.User.findOne(
            {userName: 'toto'}).exec();

        result.should.exist;
        result.userName.should.equal(newName);
        result.password.should.equal(this.data.password);
        result.firstName.should.equal(this.data.firstName);
        result.lastName.should.equal(this.data.lastName);
    }

    @test('Remove created user')
    public async removeUser() {
        const newName = 'toto';

        await UserTest.User.remove({userName: 'toto'}).exec();

        const result = await UserTest.User.findOne({userName: 'toto'}).exec();
        assert(isNull(result));
    }*/
}
