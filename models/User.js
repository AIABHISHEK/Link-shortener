import { Timestamp } from "mongodb";
import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
},
    {Timestamp : true}
);

const User = mongoose.model('User', userSchema);
export default User;