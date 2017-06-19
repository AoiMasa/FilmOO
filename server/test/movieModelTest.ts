import { suite, test } from 'mocha-typescript';
import { MovieSchema, IMovieModel } from '../src/schemas/movie';
import { IMovie } from '../src/interfaces/movie';
import { baseModelTest }  from './baseModelTest';
import mongoose = require('mongoose');
import * as chai from 'chai';

import {HttpServer, server} from '../src/server';

@suite
class MovieModelTest extends baseModelTest{

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
