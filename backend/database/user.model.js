import mongoose from "mongoose";

const userSchema  = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    username:  {
        type: String,
        required: true
    },
    dob:  {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

export const userModel = mongoose.model("userModel", userSchema)