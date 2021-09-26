import mongoose from "mongoose";

const ProductCollection = "products";

export const ProductSchema = new mongoose.Schema({
    timestramp: {type: Date},
    name: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    photo: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
})

export const product = mongoose.model(ProductCollection,ProductSchema);
