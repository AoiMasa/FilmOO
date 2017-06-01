import * as mongoose from 'mongoose';

//interfaces
import { IUser } from "./interfaces/user"; //import IUser

//schemas
import { IUserModel,UserSchema } from "./schemas/user"; //import userSchema

/**
 * Created by Argon on 01.06.17.
 */

class DB{

    private readonly MONGODB_CONNECTION : string = "mongodb://localhost:27017/Film00";

    private model: IModel; //an instance of IModel

    public constructor() {
        //instance defaults
        this.model = Object(); //initialize this to an empty object

        //code omitted
    }

    public config() {

            //code omitted

            //use q promises
            global.Promise = require("q").Promise;
            mongoose.Promise = global.Promise;

            //connect to mongoose
            let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

            //create models
            this.model.user = connection.model<IUserModel>("User", userSchema);

            //code omitted
        }
    }


}
