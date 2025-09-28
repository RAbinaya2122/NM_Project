import mongoose from "mongoose";

const todo  = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'userModel'}]
})

export const todoModel = mongoose.model("todoModel", todo)