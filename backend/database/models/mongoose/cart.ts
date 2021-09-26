import mongoose from "mongoose";
import { ProductQuantitySchema } from "./ProductQuantity";
//https://stackoverflow.com/questions/39596625/nested-objects-in-mongoose-schemas
const CartCollection = "cart";

const CartSchema = new mongoose.Schema({
    timestramp: {type: Date},
    products: [ProductQuantitySchema]
})

export const cart = mongoose.model(CartCollection,CartSchema);