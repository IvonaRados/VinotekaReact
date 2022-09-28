const mongoose = require("mongoose");

const {Schema} = mongoose;

const userModel = new Schema(
    {
    email:{type:String, unique: true, dropDups: true, required:true},
    password:{type:String, required: true},
    role:{type:String}
    }
);

module.exports = mongoose.model('User', userModel);