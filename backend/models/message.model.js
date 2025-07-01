import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    message:{type:String, required:true},
    sender:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    receiver:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
}, {timestamps:true});

export const Message = mongoose.model("Post", messageSchema);