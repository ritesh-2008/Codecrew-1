import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: { type: [String], default: [] },
    location: { 
        city: String,
        lat: Number,
        lng: Number 
    }
});

const User = mongoose.model("User", userSchema);

export default User;