const {Schema, Model} = require("mongoose");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type: String,
        required: true,
    },
    password: {
        unique: true
    },
    profileImageURL: {
        type: String,
        default: '/images/user.webp'
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
},{timestamps: true});

const User = Model('user',userSchema);
module.exports() = User;