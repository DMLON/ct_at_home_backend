import mongoose from "mongoose";

const MessagesCollection = "messages";

export const MessageSchema = new mongoose.Schema({
    timestamp: {type: Date},
    email: {type: String, required: true},
    type: {type: String, required: true, enum:["system","user"]},
    body: {type: String, required: true}
})

export const messagesModel = mongoose.model(MessagesCollection,MessageSchema);
