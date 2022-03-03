const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timzone');
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    refreshToken: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

userSchema.pre('save', function(next){
    this.createdAt = moment().tz("Asia/Jakarta").format();
    this.updatedAt = moment().tz("Asia/Jakarta").format();
    next();
});

userSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().tz("Asia/Jakarta").format() } });
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;