import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/
    },
    password : {
        type: String,
        required: true,
    },
    role : {
        type: String,
        enum: ["student", "organiser","admin"],
        default: "student",
    },
}, {
    timestamps:true,
});

const User = mongoose.model("User" , userSchema);

export default User;