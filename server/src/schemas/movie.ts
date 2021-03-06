import { Document, Schema, Model, model} from "mongoose";
import {IMovie, IMovieRate} from '../interfaces/movie';


export interface IMovieModel extends IMovie, Document{
    fullName(): string;
}

export let MovieSchema: Schema = new Schema({
    createdAt: Date,
    title: String,
    year: Number,
    actors: [{type: String}],
    rates : [{
            userId : String,
            firstName : String,
            lastName : String,
            rating : Number
    }]
});

MovieSchema.pre("save", next => {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});


export const Movie: Model<IMovieModel> = model<IMovieModel>("Movie", MovieSchema);
