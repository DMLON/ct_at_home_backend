import mongoose from "mongoose";
//https://stackoverflow.com/questions/39596625/nested-objects-in-mongoose-schemas
const CartCollection = "cart";


const CartSchema = new mongoose.Schema({
    timestamp: {type: Date},
    products: [{
        quantity:{
            type:Number,
            default:0
        },
        product:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'products'
        }
    }]
})

export const cartModel = mongoose.model(CartCollection,CartSchema);