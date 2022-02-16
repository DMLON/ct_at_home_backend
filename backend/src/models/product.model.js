import mongoose from "mongoose";

const ProductCollection = "products";

export const ProductSchema = new mongoose.Schema({
    timestamp: {type: Date},
    name: {type: String, required: true, unique:true},
    description: {type: String, required: true},
    photo: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
})

export const productModel = mongoose.model(ProductCollection,ProductSchema);
