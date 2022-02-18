import mongoose from "mongoose";
//https://stackoverflow.com/questions/39596625/nested-objects-in-mongoose-schemas
const CartCollection = "carts";

const CartSchema = new mongoose.Schema(
    {
        products: [
            {
                quantity: {
                    type: Number,
                    default: 0,
                },
                // Acá si uso refencia porque son carritos del momento!
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
            },
        ],

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    },
    { timestamps: true }
);

// Duplicate the ID field.
CartSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
CartSchema.set('toJSON', {
    virtuals: true
});

export const cartModel = mongoose.model(CartCollection, CartSchema);
