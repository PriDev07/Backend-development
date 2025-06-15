const {createHmac,randomBytes} = require('crypto');
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

userSchema.pre('save',function (next){
    const user = this;

    if(!user.isModified("password")) return ;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedPassword;
    next();
});

const User = Model('user',userSchema);
module.exports() = User;