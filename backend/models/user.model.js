import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true },
    email:{type:String, required:true, unique:true },
    password:{type:String, required:true, },
    profilePic:{type:String, default:""},
    bio:{type:String, default:""},
    gender:{type:String, enum:["male", "female", "others"]},
    followers : [{ type : mongoose.Schema.Types.ObjectId, ref: "User" }],
    following : [{type : mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts:[{type : mongoose.Schema.Types.ObjectId, ref: "Post"}],
    bookmarks:[{ type : mongoose.Schema.Types.ObjectId, ref: "Post"}]

}, {timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;