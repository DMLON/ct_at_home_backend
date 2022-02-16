import mongoose from "mongoose";

const UserCollection = "users";

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        country: { type: String, required: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        photo: { type: String, required: true },
        age: { type: Number, required: true },
        isAdmin: { type: Boolean,default:false },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cart",
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "orders",
            },
        ],
    },
    { timestamps: true }
);

// Duplicate the ID field.
UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

UserSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName;
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true
});

export const userModel = mongoose.model(UserCollection, UserSchema);
