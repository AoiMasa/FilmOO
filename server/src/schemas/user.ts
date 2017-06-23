import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../interfaces/user";


export interface IUserModel extends IUser, Document {
    fullName(): string;
}

export let UserSchema: Schema = new Schema({
    createdAt: Date,
    userName : String,
    password : String,
    firstName : String,
    lastName : String,
    movies : [{type: Schema.Types.ObjectId, ref: 'Movie'}]
});

UserSchema.pre("save", next => {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

UserSchema.methods.fullName = function() : string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
