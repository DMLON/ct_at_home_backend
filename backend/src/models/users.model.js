import mongoose from "mongoose";

const UserCollection = "user";


const UserSchema = new mongoose.Schema({
    timestamp: {type: Date},
    email: {type: String, required: true, unique: true},
    country: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true, match: /^\d{10}$/},
    address: {type: String, required: true},
    photo: {type: String, required: true},
    age: {type: Number, required: true},
    isAdmin: {type: Boolean, required: true},
})


export const userModel = mongoose.model(UserCollection,UserSchema);