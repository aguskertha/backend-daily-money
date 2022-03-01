const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const moneyRecordSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        trim: true,
    },
    description: {
        type: String
    },
    date: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

moneyRecordSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

moneyRecordSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const MoneyRecord = mongoose.model('MoneyRecord', moneyRecordSchema);
module.exports = MoneyRecord;