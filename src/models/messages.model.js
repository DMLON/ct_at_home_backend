import mongoose from "mongoose";

const MessagesCollection = "messages";

export const MessageSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        type: { type: String, required: true, enum: ["system", "user"] },
        body: { type: String, required: true },
    },
    { timestamps: true }
);

// Duplicate the ID field.
MessageSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MessageSchema.set('toJSON', {
    virtuals: true
});

export const messagesModel = mongoose.model(MessagesCollection, MessageSchema);
