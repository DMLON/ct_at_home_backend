

import mongoose from "mongoose";
import { ProductSchema } from "./product";

const ProductQuantitySchemaCollection = "productQuantity";

export const ProductQuantitySchema = new mongoose.Schema({
    product:{type:ProductSchema, required:true},
    quantity:{type:Number}
})

export const productQuantity = mongoose.model(ProductQuantitySchemaCollection,ProductQuantitySchema);

//mongodb+srv://dbUser:<password>@cluster0.tkmat.mongodb.net/myFirstDatabase?retryWrites=true&w=majority