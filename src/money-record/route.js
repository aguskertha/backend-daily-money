const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const {
    createMoneyRecord,
    getMoneyRecords,
    deleteMoneyRecordByID,
    deleteMoneyRecords,
    getMoneyRecordByID,
    updateMoneyRecordByID
} = require('./controller');

router.post('/', createMoneyRecord);
router.get('/', authenticate, getMoneyRecords);
router.get('/', getMoneyRecordByID);
router.post('/:moneyRecordID/update', updateMoneyRecordByID);
router.delete('/:moneyRecordID', deleteMoneyRecordByID);
router.delete('/', deleteMoneyRecords);

module.exports = router;