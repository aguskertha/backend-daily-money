const router = require('express').Router();
const userRouter = require('./user/route');
const moneyRecordRouter = require('./money-record/route');

router.use('/user', userRouter);
router.use('/money-record', moneyRecordRouter);

module.exports = router;
