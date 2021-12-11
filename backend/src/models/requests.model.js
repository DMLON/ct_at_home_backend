import mongoose from "mongoose";

const requestsCollection = "requests";

export const requestsSchema = new mongoose.Schema({
    timestamp: {type: Date},
    cart: {type: mongoose.Schema.Types.ObjectId, ref:'cart'},
    status: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
})

export const requestsModel = mongoose.model(requestsCollection,requestsSchema);
