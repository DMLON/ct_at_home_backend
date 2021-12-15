import mongoose from "mongoose";

const UserCollection = "user";


const UserSchema = new mongoose.Schema({
    timestamp: {type: Date},
    email: {type: String, required: true, unique: true},
    country: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    photo: {type: String, required: true},
    age: {type: Number, required: true},
    isAdmin: {type: Boolean, required: true},
    carts: 
    [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
        }
    ] 
})


export const userModel = mongoose.model(UserCollection,UserSchema);