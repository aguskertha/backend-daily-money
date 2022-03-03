const MoneyRecord = require('./model');
const User = require('./../user/model');
const ObjectID = require('mongodb').ObjectId;
const moment = require('moment');

const createMoneyRecord = async (req, res, next) => {
    try{
        const amount = req.body.amount;
        const userID = req.user.userID;
        const description = req.body.description;
        const date = moment().format('YYYY-MM-DD-HH-mm-ss');
        const user = await User.findOne({_id: ObjectID(userID)});
        if(!user){
            throw 'User not found!';
        }

        const moneyRecord = new MoneyRecord({amount, description, date, userID});
        await moneyRecord.save();
        res.json({message: 'Record successfully created!'});

    }
    catch(err){
        res.status(400).json({message: err.toString()});
    }
}

const getMoneyRecords = async (req,res, next) => {
    try{
        const userID = req.user.userID;
        const user = await User.findOne({_id: ObjectID(userID)});
        if(!user){
            throw 'User not found!'
        }
        let moneyRecords = await MoneyRecord.find({userID}).sort({'createdAt': -1});
        let filteredMoneyRecords = [];
        let totalAmount = 0;
        if(req.query.year && req.query.month && req.query.day){
            const year = req.query.year;
            const month = req.query.month;
            const day = req.query.day;
            if(!moment(year+' '+month+' '+day, 'YYYY MM DD').isValid()){
                throw 'Invalid Date!';
            }
            await Promise.all(moneyRecords.map(async (moneyRecord) => {
                const splittedDates = moneyRecord.date.split('-');
                const moneyRecordYear = splittedDates[0];
                const moneyRecordMonth = splittedDates[1];
                const moneyRecordDay = splittedDates[2];
                if( Number(year) == Number(moneyRecordYear) 
                    && Number(month) == Number(moneyRecordMonth)
                    && Number(day) == Number(moneyRecordDay)){
                    filteredMoneyRecords.push(moneyRecord);
                    totalAmount += moneyRecord.amount;
                }
            }));
        }
        else if(req.query.year && req.query.month){
            const year = req.query.year;
            const month = req.query.month;
            if(!moment(year+' '+month, 'YYYY MM').isValid()){
                throw 'Invalid Month!';
            }
            await Promise.all(moneyRecords.map(async (moneyRecord) => {
                const splittedDates = moneyRecord.date.split('-');
                const moneyRecordYear = splittedDates[0];
                const moneyRecordMonth = splittedDates[1];
                if( Number(year) == Number(moneyRecordYear) 
                    && Number(month) == Number(moneyRecordMonth)){
                    filteredMoneyRecords.push(moneyRecord);
                    totalAmount += moneyRecord.amount;
                }
            }));
        }
        else if(req.query.year){
            const year = req.query.year;
            await Promise.all(moneyRecords.map(async (moneyRecord) => {
                const splittedDates = moneyRecord.date.split('-');
                const moneyRecordYear = splittedDates[0];
                if(Number(year) == Number(moneyRecordYear)){
                    filteredMoneyRecords.push(moneyRecord);
                    totalAmount += moneyRecord.amount;
                }
            }));
        }else{
            await Promise.all(moneyRecords.map(async (moneyRecord) => {
                filteredMoneyRecords.push(moneyRecord);
                totalAmount += moneyRecord.amount;
            }));
        }
        const data = {
            moneyRecords: filteredMoneyRecords,
            totalAmount,
        }
        res.json(data);
    }
    catch(err){
        res.status(400).json({message: err.toString()});
    }
}

const getMoneyRecordByID = async (req, res, next) => {
    try {
        const moneyRecordID = req.params.moneyRecordID;
        const moneyRecord = await MoneyRecord.findOne({_id: ObjectID(moneyRecordID)});
        if(!moneyRecord){
            throw 'Record not found!';
        }
        res.json(moneyRecord);
    } catch (err) {
        res.status(400).json({message: err.toString()});
    }
}

const updateMoneyRecordByID = async (req, res, next) => {
    try {
        const moneyRecordID = req.params.moneyRecordID;
        const amount = req.body.amount;
        const description = req.body.description;
        const moneyRecord = await MoneyRecord.findOne({_id: ObjectID(moneyRecordID)});
        if(!moneyRecord){
            throw 'User not found!';
        }
        await MoneyRecord.updateOne(
            { _id: ObjectID(moneyRecordID) },
            {
                $set: {
                    amount,
                    description
                }
            }
        );
        res.json({ message: 'Record successfully updated!' });
    } catch (err) {
        res.status(400).json({message: err.toString()});
    }
}

const deleteMoneyRecords = async (req, res, next) => {
    try{
        await MoneyRecord.deleteMany();
        res.json({message: 'Records successfully deleted!'});
    }
    catch(err){
        res.status(400).json({message: err.toString()});
    }
}

const deleteMoneyRecordByID = async (req, res, next) => {
    try{
        const moneyRecordID = req.params.moneyRecordID;
        const moneyRecord = await MoneyRecord.findOne({_id: ObjectID(moneyRecordID)});
        if(!moneyRecord){
            throw 'Record not found!';
        }
        await MoneyRecord.deleteOne({_id: ObjectID(moneyRecordID)});
        res.json({message: 'Record successfully deleted!'});
    }
    catch(err){
        res.status(400).json({message: err.toString()});
    }
}

module.exports  = {
    createMoneyRecord,
    getMoneyRecords,
    deleteMoneyRecordByID,
    deleteMoneyRecords,
    getMoneyRecordByID,
    updateMoneyRecordByID
}